require('dotenv').config()
const { Client } = require('@notionhq/client');
const { get } = require('http');
const { text } = require('stream/consumers');

const notion = new Client({
    auth: process.env.NOTION_API_KEY,
})

// Gets the IDs in Notion database you you can apply them below
async function getIDs() {
    const database = await notion.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID
    });
}

// Creates the Page in the Notion database 
module.exports = function createAssignmentPage(assignmentName, dueDate, doOn, assignmentType) {

    // Figures out what ID to use given the day of the week
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
        case 'saturday':
            doOnID = "10389cf8-6a01-43ee-9d88-8336eab6c3ca";
            break;
        default:
            doOnID = '5db70016-5c7c-4632-8dee-5e9e50ea3ec2';
    }

    let emoji; 
    let url; 
    switch (assignmentType) {
        case 'homework':
            emoji = '✏'; 
            url = 'https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&w=6000'
            break;
        case 'reading':
            emoji = '📖';
            url = 'https://images.unsplash.com/photo-1553729784-e91953dec042?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=6000'; 
            
    }


    notion.pages.create({
        cover: {
            type: 'external',
            external: {
                url: url
            }
        },
        icon: {
            type: "emoji", 
            emoji: emoji
        },
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
            },
            [process.env.NOTION_DO_ON]: {
                select: {
                    id: doOnID
                }
            },
            [process.env.NOTION_TIME]: {
                number: 1
            }
        }
    })
}
