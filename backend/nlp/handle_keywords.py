import os
import codecs
from .handle_wiki import check_wiki_page

from api.models import Keyphrase

from rake_nltk import Rake
from nltk.stem import WordNetLemmatizer


def clean(kp_list):
    nlp_dir_path = os.getcwd()
    stop_words_txt = codecs.open(f'{nlp_dir_path}/nlp/stop_words.txt').read()
    stop_words = stop_words_txt.replace('\n', ' ').split(' ')

    lem = WordNetLemmatizer()
    filtered_text = filter(lambda x: x not in stop_words, kp_list)
    lemmatized_text = [lem.lemmatize(word) for word in filtered_text]
    return lemmatized_text


def get_keyphrases(text):
    rake_object = Rake(
        language='english',
        max_length=2
    )
    rake_object.extract_keywords_from_text(text)
    keyphrases = rake_object.get_ranked_phrases()
    return clean(keyphrases)


def handle_keywords(text):
    added_to_db = []
    keyphrases = get_keyphrases(text)
    for kp in keyphrases:
        wiki_page = check_wiki_page(kp)

        new_keyphrase = Keyphrase(
            keyphrase_content=kp,
            wiki_link=wiki_page.get('url'),
            disambiguation=wiki_page.get('dsmb')
        )
        new_keyphrase.save()
        added_to_db.append(new_keyphrase)
    
    return {'saved': added_to_db, 'kp': keyphrases}
