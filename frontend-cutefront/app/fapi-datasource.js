import { DataSourceWidget } from '../lib/base/datasourcewidget.js';

class FAPIMockDataSourceWidget extends DataSourceWidget {
    createState() {
        // Mock data
        this.data = [
            {
                "uuid": "123456",
                "title": "First Item",
                "description": "Description of first item"
            },
            {
                "uuid": "654321",
                "title": "Second Item",
                "description": "Description of second item"
            }
        ];

        // Schema for create operations
        this.datamodel_create = {
            title: {
                label: "Title",
                help: "Title of the item",
                check: this.checkStr.bind(this)
            },
            description: {
                label: "Description",
                help: "Description of the item",
                check: this.checkStr.bind(this)
            }
        };

        // Schema for read operations
        this.datamodel_read = this.datamodel_create;  // Same schema

        // Schema for update operations
        this.datamodel_update = this.datamodel_create;  // Same schema
    }
}

export { FAPIMockDataSourceWidget };
