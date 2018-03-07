export class ESSchemaMapper {

    public static getFieldsfromJSON(table: any)  {
        let body = {};

        table.fields.forEach((field) => {
            body[field.key] = {"type": field.type};
        })
        return { "properties": body }   
    }
}