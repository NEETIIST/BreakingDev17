import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection("products");

Products.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    },
});

Schema = new SimpleSchema({
	name: {
		type: String,
        unique: true,
	},
    desc: {
        type: String,
        unique: true,
    },
    cost: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    picture: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                uploadTemplate: 'uploadForm',
                //previewTemplate: 'uploadedFiles', // <- Optional
            },
        }
    },
});

Schema.i18n("schemas.products");
Products.attachSchema(Schema);
