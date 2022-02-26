# Code Challenge

Thanks for applying for a frontend developer role at Outdoorsy. We've put together this code challenge. It should take around two hours to complete.

## Functionality
This task is to develop a single-page app that provides the ability to search Outdoorsy listings by keyword. Users will be able to type keywords in a text field. Typing in the text field will search for relevant results and display them for the user. Listings should display an image of the vehicle and the vehicle's name.

## Visual design
An image has been supplied for visual reference.

## Endpoint documentation

*URL:*
GET https://search.outdoorsy.com/rentals

*Query parameters:*
Required: `filter[keywords]` - a space-separated string of search terms
Optional: `page[limit]` - an integer that sets requested maximum result count
Optional: `page[offset]` - an integer that sets the index of the first result
(Example: a "third page" of 8 results would have limit of 8, offset of 16)

*Response:*
The `data` object is an array of rental results.
Find name of rental at `data[].attributes.name`
Find primary image URL of rental by getting the ID from `data[].relationships.primary_image.data.id` and finding the matching `id` with `type: images` from the `included` array. The image URL is at `included[].attributes.url`.

An exported Postman collection is attached that demonstrates this request and its parameters.

## Notes
- Build this as if it will be maintained for a while.
- Please make frequent and descriptive git commits.
- Use the architecture you’re comfortable with.
- Use any dependencies that you find useful to complete the task.
- Please use Next.js/React and Typescript or Ember.js.
- Feel free to add functionality as you have time, but the functionality description above is priority.

## What we’re looking for
- Functionality of project matches description above
- Visual design mostly matches designs (pixel perfect isn’t required since specs are rough, but approximately the same)
- An ability to think through all potential states
- Code design and style should be consistent and reasonable
- In the README of the project, describe exactly how to run the application

When complete, please push your code to Github and send the link to the project or zip the project (including the `.git` directory) and send it back.

Thank you and please ask if you have any questions!
