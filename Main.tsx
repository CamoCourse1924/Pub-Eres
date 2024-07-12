import { Devvit, RichTextBuilder } from '@devvit/public-api';
import { Submissionform } from './secondpage.js'; 
Devvit.configure({ media: true, redditAPI: true })

// This is the home page 
type PageProps = {
  setPage: (page: string) => void;
  context: any;  
}

const PageA = ({ setPage, context }: PageProps) => (
  <vstack height="100%" alignment="start">
    <text size="xxlarge" weight="bold" alignment="center">
      Welcome to R/EngineeringResumes
    </text> 
    <vstack alignment= "middle center">  
      <image url="Snoobg.png" imageWidth={150} imageHeight={150} />
      <text size="medium" weight="bold">
        Save yourself the headache 
        and make sure to read the wiki for 
        submission rules
      </text>
    </vstack>
    <spacer />
    <vstack alignment="center" height="100%">
      <spacer size= "large" />
      <hstack gap="large" width="100%">
      <button grow
          appearance="primary"
          onPress={() => context.ui.navigateTo('https://www.reddit.com/r/EngineeringResumes/wiki/submission-instructions/')}
          textColor='white'
        >
          Wiki 
      </button>
      <button grow
          appearance="primary"
          onPress={() => context.ui.showForm(Submissionform)}
          textColor='white'
        >
          Continue 
        </button>
        <button grow
          appearance='primary'
          onPress={() => context.ui.navigateTo('https://www.cleverpdf.com/pdf-to-images#google_vignette')}
          textColor='white'
        >
          Converter
        </button>
      </hstack>
    </vstack>
  </vstack>
); 
Devvit.addCustomPostType({
  name: 'Home Page',
  render: context => {
    const { useState } = context;
    const [page, setPage] = useState('a');
    return (
      <blocks>
        ,<PageA setPage={setPage} context = {context} />
      </blocks>
    )
  } 
});
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'create a custom post ',
  onPress: async (_, context) => {
    const { reddit, ui } = context;
    const currentSubreddit = await reddit.getCurrentSubreddit();
    context.ui.showForm(Submissionform);
    await reddit.submitPost({  
      title: 'Post Submission',  
      subredditName: currentSubreddit.name,  
      preview: (  
        <vstack>  
          <text>Post is being created</text>  
        </vstack>  
      ),  
    });  
    ui.showToast(`Submitted custom post to ${currentSubreddit.name}`); 
  },
});
export default Devvit;
