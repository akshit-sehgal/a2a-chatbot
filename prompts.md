====================

The objective is to create a chatbot where in a user can type a query/select an action and the BE returns a JSON and the chatbot has a corresponding component to render.

Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
https://claude.ai/design/p/e288ce42-f47d-4f16-9d00-d3a0eefdf0bb?file=Recruiter+Chat.dc.html

Focus on these files (the whole project is readable):
- `Recruiter Chat.dc.html`

Also read these files the selection imports:
- `ios-frame.jsx`
- `support.js`

Implement: the navbar, the chatbox, the typing loader, the chat bubbles and the bottom actions and 4 templates: the welcome screen, the job posting form, the question builder and the job card ready to be posted (These will be rendered when the BE returns a response) `Recruiter Chat.dc.html`

Create a template type for basic textNode -> which simply renders the html returned

consider the BE returns the response in the following format:

{
  data:{
    type: 'jobPostingForm', // or welcome screen / textNode / questionsBuilder /
    text: "Let's build it. I pre-filled what I know from your last SDE hire — edit anything."
    actions: ['Save'],
    data:{
      // extra data used by the template
    }
  }
}

maintain an array of messages received from the BE as well as the one typed by the user

Whenever user types a message and clicks send or clicks an action make a post API call.
On app load open a SSE connection with which it will receive response from the BE. 

Ask me questions if any.

====================

Need to add threadId support to messages:

Currently all messages are stored in an array, the SSE event will also send a threadId.

so we need to group messages corresponding to a thread.

We will also send the threadId in the post call (initially it will be null)

To switch between different threads, on the navbar instead of the reload icon, add active thread/total thread with a right chevron clicking on this chevron will auto swtich to the next thread.
Clicking on the last thread will take the user to the first.

Ask me if there are any open questions

====================

We need to modify the agent so that it can also work as a common UI layer for a jobseeker agent.
a. If there is a new query param: type=js we will assume that it is for a job seeker and we will do the following changes:
- change the navbar heading to Job seeker assist
- change the theme from purple to brownish golden instead of violet

====================

Need to create a different welcome screen for the jobseeker so we`ll create a new template refering the existing welcome screen:
- The text message will highlight the recruiter activity like 4 recruiters viewed your profile, new job openings available.
- Instead of post a job - change it to update your profile
- Instead of view my jobs -> change it to view openings
- Instead of review application -> application status

Whenever a jobseeker connects (use the type: js), ensure that the backend sends this new welcome screen

====================

Create a new template which will allow a jobseeker to update the profile and will present a form which will allow to updated the following fields:
- Name
- Preffered Role
- Preferred location
- Expected CTC
- Keyskills

===================== 

Create a new template which will allow a jobseeker to view the application status, it should have a summary of a few jobs: recruiter icon, job title, location, ctc as a collapsed tuple and along with the recruiter action taken (assume 3-4 statuses)

=====================

Create a new template which will allow a job seeker to view a new posted job (returned on view openings)

- This will be exactly like the job card button but will have two CTAs: Apply now, Ask for Referral


=====================

Create a new template for referral approval:
This will show a brief summary of the candidate and the job posted:
Candidate name + work experience + location
Job title + location + CTC
A candidate match score
Approve/Reject button