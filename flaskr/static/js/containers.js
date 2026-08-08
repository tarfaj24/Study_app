export function getPage(page){
    const pages = {
        home: '<div> Welcome this is home </div>',
        note_creator: `<textarea name="analogy_text_box" id="analogy_text_box" rows="5" cols="33"></textarea>
            <button class = "btn btn-primary" id = "get_analogy_btn">Submit</button>
            <p id = "analogy_output_display"></p>`,
        pomodoro: `<p id = "pomodoro_phases">Start phase 1: Focused Studying</p>
            <button class = "btn btn-primary" id = "start_timer_btn">start timer</button><button class = "btn btn-danger" id="stop_timer_btn" hidden>Stop timer</button>
            <button class = "btn btn-secondary" id = "reset_timer_btn">Reset timer</button> 
            <time id = "pomodoro_counter"></time> 
            <div class = "pomodoro_description">
            <h2>What is the Pomodoro technique?</h2>
            <p>The Pomodoro is a studying technique used mainly for tackling procrastination.</p>
            <h3>It consists of 3 stages.</p>
            <h3>Stage 1: Focused studying</h3>
            <p>The goal of this stage is for you to enter the focused mode and learn what you can until the 25 minute timer rings.
                Procrastination can make you put aside your work for later so you should be trying to convince your brain to last at least
                These 25 minutes.
            </p>
            <h4>Stage 2: Recalling what you learned</h4>
            <p>This stage is all about thinking back on these 25 minutes and trying to gather all the important information you have learned about. You shouldn't spend more than
                3-5 minutes in this stage.
            </p>
            <h4>Stage 3: Restfull wakefullnes</h4>
            <p>This is the stage everyone is waiting for. It is all about relaxing your brain and letting it enter the Difuse Mode. In this stage you shouldn't
                put and strain on your brain and just let it relax. The most important thing is not to touch your phone, pc or anything that could take your attention and
                put your brain back into the Focused Mode.
            </p>
        </div>`
        }
    return pages[page];
}
    