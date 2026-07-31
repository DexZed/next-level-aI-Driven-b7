#!/usr/bin/env -S node
import { Migration, MigrationCLI } from '@prisma-next/postgres/migration';

export default class M extends Migration {
  override describe() {
    return {
      from: null,
      to: 'sha256:33b8c253312f706265e806ecf89fb45616b4a0bdc45516392155b9e9da620e47',
    };
  }

  override get operations() {
    return [];
  }
}

MigrationCLI.run(import.meta.url, M);
