# BlogAPI

## Description  

EcBlog is a full-stack application that includes two front ends and one backend. The two front ends are the client side, which is the actual blog open to everyone where various articles are present, and users can leave comments after registering. The other front end is the CMS side, which is reserved for blog administration where it is possible to edit, publish, feature, and delete articles and comments.

## Struggles Points

The first real obstacle was understanding and not getting confused between authentication with Passport Local, used together with Passport JWT Strategy to manage authorization for various server routes and make API calls.

Once I understood this mechanism, I saved the JWT token in localStorage and used a Context in React to manage the user access on the front end. I used the same strategy for both the client and the CMS, but despite everything working perfectly on the client side, I have problems with the CMS. When the page is refreshed, the user loses access even though the token is still present in localStorage. I plan to revisit this bug in the future to resolve it.

Another difficulty I encountered was using Cloudinary for saving images for each post. I used this service to avoid burdening the database with multiple images, saving only the links pointing to Cloudinary instead.

Lastly, I also used TinyMCE as an editor for writing the body of each post. I noticed that the editor has many features, but I decided to use it in a basic way to avoid further complicating the project.

## Conclusion

After completing this project, I finally feel like I have created something that can be used in the real world. During development, I had many ideas on how to add functionalities and other features to my application, and I learned a lot about RESTful APIs, the server, and it was very useful to review React once again. This was my first real full-stack application, and I am happy with the result, even though I would like to go back and improve its graphical appearance.

## Live Preview

[Client Live Preview](https://ec-blogapi.netlify.app/)

[CMS Live Preview](https://cms-ec-blogapi.netlify.app/)
