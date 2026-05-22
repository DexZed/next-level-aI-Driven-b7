import type{ Request, Response } from "express";

export async function createIssue(req:Request,res:Response){
    res.json({
        success:true,
        message:'from createIssue',
        data:req.body
    })
}

export async function getIssues(req:Request,res:Response){
    res.json({
        success:true,
        message:'from getIssues',
        data:req.body
    })
}

export async function getIssue(req:Request,res:Response){
    res.json({
        success:true,
        message:'from getIssue',
        data:req.body
    })

}

export async function updateIssue(req:Request,res:Response){
    res.json({
        success:true,
        message:'from updateIssue',
        data:req.body
    })

}

export async function deleteIssue(req:Request,res:Response){
    res.json({
        success:true,
        message:'from deleteIssue',
        data:req.body
    })


}