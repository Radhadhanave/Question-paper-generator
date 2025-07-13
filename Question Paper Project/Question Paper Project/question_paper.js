const questionContainer = document.getElementById('questions');
let questionCount = 1;
const coPoMappings = {
  "REMEMBER": ["write", "list", "label", "name", "state", "define", "count", "describe", "draw", "find", "identify", "match",
    "quote", "recall", "recite", "sequence", "tell", "arrange", "duplicate", "memorize", "order", "outline",
    "recognize", "relate", "repeat", "reproduce", "select", "choose", "copy", "how", "listen", "locate",
    "memorise", "observe", "omit", "read", "recognise", "record", "remember", "retell", "show", "spell",
    "trace", "what", "when", "where", "which", "who", "why"],
  "UNDERSTAND": ["explain", "summarize", "paraphrase", "describe", "illustrate", "conclude", "demonstrate", "discuss",
    "generalize", "identify", "interpret", "predict", "report", "restate", "review", "tell", "classify",
    "convert", "defend", "distinguish", "estimate", "express", "extend", "give example", "indicate",
    "infer", "rewrite", "select", "translate", "ask", "cite", "compare", "contrast", "generalise", "give examples",
    "match", "observe", "outline", "purpose", "relate", "rephrase", "show", "summarise"],
  "APPLY": ["Use", "Compute", "Solve", "Demonstrate", "Apply", "Construct", "Change", "Choose", "Dramatize", "Interview",
    "Prepare", "Produce", "Select", "Show", "Transfer", "Discover", "Employ", "Illustrate",
    "Interpret", "Manipulate", "Modify", "Operate", "Practice", "Predict", "Relate schedule", "Sketch",
    "Use write", "Act", "Administer", "Associate", "Build", "Calculate", "Categorise", "Classify",
    "Connect", "Correlation", "Develop", "Dramatise", "Experiment", "With", "Group", "Identify",
    "Link", "Make use of", "Model", "Organise", "Perform", "Plan", "Relate", "Represent", "Simulate",
    "Summarise", "Teach", "Translate"],
  "ANALYSIS": ["Analyse", "Categorize", "Compare", "Contrast", "Separate", "Characterize", "Classify", "Debate", "Deduce",
    "Diagram", "Differentiate", "Discriminate", "Distinguish", "Examine", "Outline", "Relate", "Research",
    "Appraise", "Breakdown", "Calculate", "Criticize", "Derive", "Experiment", "Identify", "Illustrate",
    "Infer", "Interpret", "Model", "Outline", "Point out", "Question", "Select", "Subdivide", "Test",
    "Arrange", "Assumption", "Categorise", "Cause and", "Effect", "Choose", "Difference", "Discover",
    "Dissect", "Distinction", "Divide", "Establish", "Find", "Focus", "Function", "Group", "Highlight",
    "In-depth", "Discussion", "Inference", "Inspect", "Investigate", "Isolate", "List", "Motive", "Omit",
    "Order", "Organise", "Point out", "Prioritize", "Rank", "Reason", "Relationships", "Reorganise", "See",
    "Similar to", "Simplify", "Survey", "Take part in", "Test for", "Theme", "Comparing"],
  "CREATE": ["Create", "Design", "Hypothesize", "Invent", "Develop", "Compose", "Construct", "Integrate", "Make",
    "Organize", "Perform", "Plan", "Produce", "Propose", "Rewrite", "Arrange", "Assemble", "Categorize",
    "Collect", "Combine", "Comply", "Devise", "Explain", "Formulate", "Generate", "Prepare", "Rearrange",
    "Reconstruct", "Relate", "Reorganize", "Revise", "Set up", "Summarize", "Synthesize", "Tell", "Write",
    "Adapt", "Add to", "Build", "Change", "Choose", "Combine", "Compile", "Convert", "Delete", "Discover",
    "Discuss", "Elaborate", "Estimate", "Experiment", "Extend", "Happen", "Hypothesise", "Imagine",
    "Improve", "Innovate", "Make up", "Maximise", "Minimise", "Model", "Modify", "Original", "Originate",
    "Predict", "Reframe", "Simplify", "Solve", "Speculate", "Substitute", "Suppose", "Tabulate", "Test",
    "Theorise", "Think", "Transform", "Visualise"],
  "EVALUATION": ["Judge", "Recommend", "Critique", "Justify", "Appraise", "Argue", "Assess", "Choose", "Conclude",
    "Decide", "Evaluate", "Predict", "Prioritize", "Prove", "Rank", "Rate", "Select", "Attach", "Compare",
    "Contrast", "Defend", "Describe", "Discriminate", "Estimate", "Explain", "Interpret", "Relate",
    "Summarize", "Support", "Value", "Agree", "Award", "Bad", "Consider", "Convince", "Criteria",
    "Criticise", "Debate", "Deduct", "Determine", "Disprove", "Dispute", "Effective", "Give reasons", "Good",
    "Grade", "How do we", "Know", "Importance", "Infer", "Influence", "Mark", "Measure", "Opinion",
    "Perceive", "Persuade", "Prioritise", "Rule on", "Test", "Useful", "Validate", "Why"],
};

function identifyCoPo(question) {
  let identifiedCO = null;

  const questionLower = question.toLowerCase();
  for (const [coPoType, verbs] of Object.entries(coPoMappings)) {
    const matchedVerbs = verbs.filter(verb => questionLower.includes(verb.toLowerCase()));

    if (matchedVerbs.length > 0) {

      identifiedCO = coPoType;
      break;
    }
  }

  if (identifiedCO === null) {
    return { co: null, po: null };
  }

  const pos_level = ["REMEMBER", "UNDERSTAND", "APPLY", "ANALYSIS", "CREATE", "EVALUATION"];
  const cos_level = ["REMEMBER", "REMEMBER", "UNDERSTAND", "APPLY"];

  const poPosition = pos_level.indexOf(identifiedCO) + 1;

  const coPosition = cos_level.indexOf(identifiedCO) + 1;

  return { co: coPosition, po: poPosition };
}

function addMainQuestion() {
  if (questionCount <= 4) {
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
    <h3>Q.${questionCount} Attempt any 2 from the following questions. <span style="float: right;">CO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;PO&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marks</span></h3>
      <button onclick="addSubQuestion(${questionCount}, this)">Add Sub-Question</button>
      <div id="subQuestions${questionCount}" class="sub-questions"></div>
    `;
    questionContainer.appendChild(questionElement);
    questionCount++;
    if (questionCount == 4) {
      document.getElementById('addQuestionButton').style.display = 'none';
    }
  }
}

function addSubQuestion(mainQuestionNumber, button) {
  const numSubQuestions = 3;
  const mainQuestionElement = button.parentNode;
  const subQuestionsContainer = mainQuestionElement.querySelector(`#subQuestions${mainQuestionNumber}`);
  for (let i = 1; i <= numSubQuestions; i++) {
    let subQuestionText = '';
    let subQuestionCO = '';
    let subQuestionPO = '';
    do {
      subQuestionText = prompt(`Enter sub-question ${i}:`);
      const { co, po } = identifyCoPo(subQuestionText);
      if (co !== null && po !== null) {
        subQuestionCO = co;
        subQuestionPO = po;
      } else {
        alert(`CO not identified for sub-question ${i}. Please re-enter.`);
      }
    } while (subQuestionCO === '' || subQuestionPO === '');

    const subQuestion = document.createElement('div');
    subQuestion.classList.add('sub-question');
    subQuestion.innerHTML = `
    <table style="border-collapse: separate; border-spacing: 10px;">
      <thead>
        <tr>Q.${i} ${subQuestionText}. <span style="float: right;">${subQuestionCO}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${subQuestionPO}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${7}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></tr>
      </thead>
      <tbody id="question${questionCount}"></tbody>
    </table>
    `;
    subQuestionsContainer.appendChild(subQuestion);
  }

  button.style.display = 'none';
  if (questionCount == 3) {
    document.getElementById('submitForm').style.display = 'block';
  }
  const subQuestions = subQuestionsContainer.querySelectorAll('.sub-question');
  subQuestions.forEach(subQuestion => {
    subQuestion.style.display = 'block';
  });
}

function printPage() {
  document.getElementById('printButton').style.display = 'none';
  window.print();
  document.getElementById('printButton').style.display = 'block';
}

function submitForm() {
  const courseNameInput = document.getElementById('course-name');
  const courseError = document.getElementById('course-error');

  // Check if the course name is empty
  if (courseNameInput.value.trim() === '') {
    courseNameInput.classList.add('error');
    courseError.textContent = 'Please enter the course name.';
    return; // Stop form submission
  } else {
    courseNameInput.classList.remove('error');
    courseError.textContent = '';
    document.getElementById('submitForm').style.display = 'none';
    document.getElementById('printButton').style.display = 'block';
  }
}