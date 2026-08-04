

function timer(){
    let timer = null
    let seconds = 0;

    function onInterval(){
        seconds++;
        console.log(seconds)

    }

    function startTimer(){
            console.log(timer)
            timer = setInterval(onInterval, 1000)
    }
    function stopTimer(){
        if (timer != null){
            clearInterval(timer)
        }
    }

    document.querySelector('#start_timer_btn').addEventListener('click', startTimer)
    document.querySelector('#stop_timer_btn').addEventListener('click', stopTimer)
}



export function pomodoro(){
    console.log('pomodoro called')
    timer()
    
    
    
}   
    


