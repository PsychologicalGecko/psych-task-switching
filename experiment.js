// ====================
// experiment.js
// ====================

const jsPsych = initJsPsych({
    display_element: 'jspsych-target',
    on_finish: function() {
        jsPsych.data.get().localSave('csv','task_switch_data.csv');
        document.body.innerHTML = `<h2>Thank you!</h2><p>Your data has been saved.</p>`;
    }
});

let timeline = [];

// Fullscreen
timeline.push({ type: jsPsychFullscreen, fullscreen_mode: true });

// Demographics
timeline.push({
  type: jsPsychSurveyHtmlForm,
  preamble: `<h2>Demographic Questions</h2>`,
  html: `
     <p>Age: <input name='age' type='number' required></p>
     <p>Gender: <input name='gender' required></p>
  `,
  data: { trial_type: 'demographics' }
});

// Instructions 1 (Accuracy block)
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<h2>Block 1: Accuracy</h2><p>Focus on accuracy. Press SPACE to begin.</p>`,
  choices: [' ']
});

// Block 1: Shapes / Colors
let shapes = ['■','◆','▲','●'];
let colors = ['red','blue','green','orange'];

function shapeTrial(n){
 let shape = jsPsych.randomization.sampleWithoutReplacement(shapes,1)[0];
 let color = jsPsych.randomization.sampleWithoutReplacement(colors,1)[0];
 return {
   type: jsPsychHtmlKeyboardResponse,
   stimulus: `<div style='font-size:60px; color:${color}'>${shape}</div>`,
   choices: ['f','j'],
   data: {block:1, trial_num:n, shape, color}
 };
}

for(let i=1;i<=20;i++){ timeline.push(shapeTrial(i)); }

// Instructions 2 (Speed block)
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<h2>Block 2: Speed</h2><p>Focus on speed. Press SPACE to begin.</p>`,
  choices: [' ']
});

// Block 2: Letters / Numbers
let letters = ['A','C','E','G'];
let numbers = ['1','2','3','4'];

function letterTrial(n){
 let letter = jsPsych.randomization.sampleWithoutReplacement(letters,1)[0];
 let number = jsPsych.randomization.sampleWithoutReplacement(numbers,1)[0];
 return {
   type: jsPsychHtmlKeyboardResponse,
   stimulus: `<div style='font-size:60px'>Letter: ${letter}  |  Number: ${number}</div>`,
   choices: ['f','j'],
   data: {block:2, trial_num:n, letter, number}
 };
}

for(let i=21;i<=40;i++){ timeline.push(letterTrial(i)); }

// Exit fullscreen
timeline.push({ type: jsPsychFullscreen, fullscreen_mode: false });

// Run the experiment
jsPsych.run(timeline);