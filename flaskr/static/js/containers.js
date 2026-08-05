export function getPage(page){
    const pages = {
        home: '<div> Welcome this is home </div>',
        page_1: '<div> Welcome this is page_1 </div>',
        pomodoro: '<button id="start_timer_btn">start timer</button><button id="stop_timer_btn" hidden>stop timer</button>pomodoro start',
        }
    return pages[page];
}
    