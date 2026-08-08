async function getAnalogy(input){
    try{
        const response = await fetch('/api/analogy/generate', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({analogy_input: input})
        });
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result.analogy_output
    } catch(error){
        console.error(error);
    }
}

async function displayAnalogy(input) {
    document.querySelector('#analogy_output_display').innerText = await getAnalogy(input)
}

export function note_creator(){
    console.log('note creator started')
    document.querySelector('#get_analogy_btn').addEventListener('click', async () => displayAnalogy(document.querySelector('#analogy_text_box').value));
}
    
