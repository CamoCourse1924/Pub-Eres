import { Devvit, RichTextBuilder } from '@devvit/public-api';
 // Devvit.configure({ media: true, redditAPI: true })
 
 const Submissionform = Devvit.createForm (
  {
    title: 'Submission Form',
    fields: [
    {
        name: 'Title',
        type: 'paragraph',
        label: "Title",
       helpText: "Please format your title as follows:[X YoE] or [Student], where X is the number of your FULL-TIME (NON-INTERNSHIP) years of experience",
        required: true, 
      
    },
    {
      type: 'paragraph',
      name: "description",
      label: 'Description',
      helpText: "Please include a brief description 250+ characters of your resume. This can include your experience, skills, and what you are looking for in your next role.",
     required: true, 
    },
    {
      name: 'Resume',
      type: 'image', // This tells the form to expect an image
      label: 'Upload image', 
      required: true,
   },
  ],
},
   async (event, context) => {
    const imageUrl = event.values.Resume;
    const postDescription = event.values.description;
    const postTitle = event.values.Title 

    if (postDescription.length < 250) { 
      context.ui.showToast('Your description must be over 250 characters long.'); 
      throw new Error('Description must be over 250 characters long');
   }

    
   
   const currentSubreddit = await context.reddit.getCurrentSubreddit(); 
    try {
      const response = await context.media.upload({
        url: imageUrl, 
        type: 'image',
      });
      const post = await context.reddit.submitPost({
        title: postTitle,
        subredditName: currentSubreddit.name,
        text: postDescription,  
        kind: 'image', 
       url: imageUrl,
    });
      console.log('Post submitted successfully:', post)
      context.ui.showToast('Thank you for submitting a post!' ); 
      //setImageUrl(imageUrl); 
    } catch (error) {{
      console.error('Error submitting post', error)
      context.ui.showToast('Error submitting post '+ error);
    }}
  }
); 
export const App = (context: Devvit.Context): JSX.Element => {
  const [imageUrl, setImageUrl] = context.useState<string>("");

const showForm = () => {
  context.ui.showForm(Submissionform);}

Devvit.addMenuItem({  
  location: 'subreddit',  
  label: 'Submit a post',  
  onPress: (_event, context) => {  
    context.ui.showForm( Submissionform );  
  },  
});  
return (
  <blocks>
    <button onPress={showForm}>Submit a post</button>
    <image url={imageUrl} imageWidth={100} imageHeight={100} />
  </blocks>)
};
//export const { Submissionform };
export { Submissionform }; 
//export default Devvit;
