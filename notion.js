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