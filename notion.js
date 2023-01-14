require('dotenv').config()
const { Client } = require('@notionhq/client'); 
const { get } = require('http');
const { text } = require('stream/consumers');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

async function getTags() {
    const database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID
    });
    console.log(database.properties.Class.select.options); 
}
getTags(); 


function createAssignmentPage(assignmentName, dueDate) {
    let doOnID;
    switch (doOn) {
        case 'sunday':
            doOnID = "4abf0d3f-c2df-4fb2-b927-0fa3ff3ef3fc";
            break;
        case 'monday':
            doOnID = '0d9dd7d8-f5fc-4823-99a3-f553a70dbb54';
            break;
        case 'tuesday':
            doOnID = "8cbb5e25-f78a-45fe-b883-c5c9983c7afe";
            break;
        case 'wednesday':
            doOnID = "7ceaf8a0-5c20-4d86-87dc-5144c1ffdb6d";
            break;
        case 'thursday':
            doOnID = "ccf13268-2efc-4bbf-937a-390b1f5a885d";
            break;
        case 'friday':
            doOnID = "8ee50ea7-275e-4ec6-af32-004b9316a83e";
            break;
        case 'sauterday':
            doOnID = "10389cf8-6a01-43ee-9d88-8336eab6c3ca";
            break;
        default:
            doOnID = null;
    

    notion.pages.create({
        parent: {
            database_id: process.env.NOTION_DATABASE_ID
        },
        properties: {
            [process.env.NOTION_NAME]: {
                title: [
                    {
                        type: 'text', 
                        text: {
                            content: assignmentName
                        }
                    }
                ]
            },
            [process.env.NOTION_DUE_DATE]: {
                date: {
                    start: dueDate
                }
            },
            [process.env.NOTION_CLASS]: {
                select: {
                    id: '?B::'
                }
            }
        }
    })
}

createAssignmentPage('testing', '2023-01-10');