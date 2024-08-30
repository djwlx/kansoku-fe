import { ISchema } from '@formily/react';
import { SchemaField as FormilySchemaField } from '@formily/semi';

export const SchemaField = <FormilySchemaField components={{}} />;

export type DSchema = ISchema['properties'];
