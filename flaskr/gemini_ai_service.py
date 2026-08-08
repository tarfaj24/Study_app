from google import genai

client = genai.Client()

def generate_analogy(analogy_input):

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        system_instruction="Your goal is to write a short maximum of 8 sentences long analogy/metaphor. Based on the text you will get. The analogy should be easy to understand and" \
        "help people to understand a topic. If the text the person writes cant be made into an analogy or wouldn't make any sense if made into an analogy" \
        " just write: Sorry can't create analogy. Base the response on the language of the inputed text." \
        "The analogy should be helpfull mainly in a studying perspective and have multiple points of commonality with the study topic.",
        input = analogy_input
    )
    return interaction.output_text