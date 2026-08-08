function time_pomodoro(){
    let seconds = 0;
    let seconds_no_reset = 0;

    function displayTimer(seconds){
        const seconds_inner = seconds % 60 < 10 ? '0' +  seconds % 60: seconds % 60;
        const minutes = Math.floor(seconds / 60);
        document.querySelector('time').innerText = minutes + ':' + seconds_inner;
        
    };
    function displayFirstPhase(){
        document.querySelector('#pomodoro_phases').innerText = 'Start phase 1: Focused Studying';
    }

    function displaySecondPhase(){
        document.querySelector('#pomodoro_phases').innerText = 'Start phase 2: Recalling information';
    }

    function displayThirdPhase(){
        document.querySelector('#pomodoro_phases').innerText = 'Start phase 3: Restfull wakefullness';
    }

    function playAlarm(){
        let alarm = new Audio('./../static/pomodoro/audio/alarm.mp3');
        alarm.play()
    }

    function onInterval(){
        seconds++;
        seconds_no_reset++;
        displayTimer(seconds);

        if (seconds_no_reset == 1500){
            pauseTimer();
            displaySecondPhase();
            playAlarm();
            seconds = 0;
        }
        else if (seconds_no_reset == 1740){
            pauseTimer();
            displayThirdPhase();
            playAlarm();
            seconds = 0;
        }
        else if (seconds_no_reset == 1920){
            playAlarm();
            resetTimer();
        }
  
    };

    function startTimer(){
        timer = setInterval(onInterval, 1000)
        document.querySelector('#start_timer_btn').hidden = true;
        document.querySelector('#stop_timer_btn').hidden = false;
    };


    function pauseTimer(){
        if (timer != null){
            clearInterval(timer)
        }
        document.querySelector('#start_timer_btn').hidden = false;
        document.querySelector('#stop_timer_btn').hidden = true;
    };

    function resetTimer(){
        if (timer != null){
            pauseTimer();
            seconds = 0;
            seconds_no_reset = 0;
            displayTimer(seconds);
            displayFirstPhase();
        }
        
    }

    

    



    document.querySelector('#start_timer_btn').addEventListener('click',startTimer );
    document.querySelector('#stop_timer_btn').addEventListener('click',pauseTimer);
    document.querySelector('#reset_timer_btn').addEventListener('click',resetTimer);
}

let timer = null;

export function pomodoro(){
    console.log('pomodoro called')
    time_pomodoro() 
}   
    
export function destroyPomodoro(){
    if (timer != null){
        clearInterval(timer)
    }
}


