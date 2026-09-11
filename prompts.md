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