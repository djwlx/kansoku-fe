import { ISchema, createSchemaField } from '@formily/react';

export const SchemaField = createSchemaField({
  components: {},
  scope: {},
});

export type DSchema = ISchema['properties'];
