import { asyncWrapper } from "../../lib/asyncWrapper.js";
import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../prisma/db.js";
import Stripe from "stripe"
import { env } from "../../env.js"
import { RequestExtended } from "../../interfaces/index.js";

const stripe = new Stripe(env.STRIPE_SECRET_KEY)



export const createIntent = asyncWrapper(async (req: RequestExtended, res: Response) => {
    const { id } = req.body;

    const userId = req.user?.id;

    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Booking ID is required." });
    }

    const booking = await db.orm.public.Booking.select('id', 'service_id', 'total_price')
        .where((i) => i.id.eq(id))
        .first();

    if (!booking) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Booking not found." });
    }


    const amountInCents = Math.round(booking.total_price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        automatic_payment_methods: { enabled: true },
        metadata: {
            booking_id: id,
            user_id: userId,
        },
    });

    res.status(StatusCodes.OK).json({
        message: "success",
        data: {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            bookingId: booking.id,
        },
    });
});
export const confirmIntent = asyncWrapper(async (req: Request, res: Response) => {
    const { bookingId, paymentIntentId, paymentMethodId } = req.body;

    if (!paymentIntentId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: "paymentIntentId is required.",
        });
    }
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId || "pm_card_visa",
    });

    if (paymentIntent.status === "succeeded") {
        const payedBooking = await db.orm.public.Booking
            .select("id", "total_price")
            .where((i) => i.id.eq(bookingId))
            .first();

        await db.orm.public.Payments.create({
            booking_id: bookingId,
            amount: paymentIntent.amount / 100,
            method: "stripe",
            provider: "stripe",
            status: "completed",
            paid_at: new Date(),
        });

        return res.status(StatusCodes.OK).json({
            message: "Payment intent confirmed successfully",
            status: paymentIntent.status,
            paymentIntent,
        });
    }

    res.status(StatusCodes.BAD_REQUEST).json({
        message: `Payment status is ${paymentIntent.status}`,
        status: paymentIntent.status,
    });
});
export const handleWebhook = asyncWrapper(async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = env.STRIPE_WEBHOOK_SECRET;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig!, endpointSecret!);
    } catch (err: any) {
        return res.status(StatusCodes.BAD_REQUEST).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const bookingId = paymentIntent.metadata.booking_id;

        if (bookingId) {
            const existingPayment = await db.orm.public.Payments
                .select("id")
                .where((i) => i.booking_id.eq(bookingId))
                .first();

            if (!existingPayment) {
                await db.orm.public.Payments.create({
                    booking_id: bookingId,
                    amount: paymentIntent.amount / 100,
                    method: "stripe",
                    provider: "stripe",
                    status: "completed",
                    paid_at: new Date(),
                });
            }
        }
    }

    res.status(StatusCodes.OK).json({ received: true });
});

export const getPaymentHistory = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `Payment history fetched successfully`,
    });
});

export const getPaymentByUserId = asyncWrapper(async (req: Request, res: Response) => {
    res.status(StatusCodes.OK).json({
        message: `Payment details fetched successfully`,
    });
});

