

function time_pomodoro(){
    let seconds = 0;

    function displaytimer(seconds){
        const seconds_inner = seconds % 60 < 10 ? '0' +  seconds % 60: seconds % 60;
        const minutes = Math.floor(seconds / 60);
        document.querySelector('time').innerText = minutes + ':' + seconds_inner;
    };

    function onInterval(){
        seconds++;
        console.log('seconds: ', seconds % 60, 'minutes: ', Math.floor(seconds / 60));
        displaytimer(seconds);
        

    };

    function startTimer(){
        console.log()
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

    

    



    document.querySelector('#start_timer_btn').addEventListener('click',startTimer );
    document.querySelector('#stop_timer_btn').addEventListener('click',pauseTimer);
    const tabs = document.querySelector('#main_nav');
    

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


