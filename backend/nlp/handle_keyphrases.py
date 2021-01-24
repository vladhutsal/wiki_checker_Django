import os
import codecs
import string

from .handle_wiki import check_wiki_page

from api.models import Keyphrase
from api.serializers import  KpSerializer

from rake_nltk import Rake
from nltk.stem import WordNetLemmatizer

import nltk
nltk.download('wordnet')


def clean(kp_list):
    nlp_dir_path = os.getcwd()
    stop_words_txt = codecs.open(f'{nlp_dir_path}/nlp/stop_words.txt').read()
    stop_words = stop_words_txt.replace('\n', ' ').split(' ')

    lem = WordNetLemmatizer()
    filtered_text = filter(lambda x: x not in stop_words, kp_list)
    lemmatized_text = [lem.lemmatize(word) for word in filtered_text]
    raw_text = [w.translate(str.maketrans('', '', string.punctuation)) for w in lemmatized_text]
    return raw_text


def get_keyphrases(text):
    rake_object = Rake(
        language='english',
        max_length=2
    )
    rake_object.extract_keywords_from_text(text)
    keyphrases = rake_object.get_ranked_phrases()
    return clean(keyphrases)


def handle_keyphrases(text):
    kp_list = []
    keyphrases = get_keyphrases(text)
    for kp in keyphrases:
        try:
            kp_obj = Keyphrase.objects.get(kp_content=kp)
            kp_obj.score += 1
            kp_obj.save()
            print(f'Score increased for {kp_obj.kp_content}')

        except Keyphrase.DoesNotExist:
            kp_obj = Keyphrase.objects.create(kp_content=kp)
            link, dsmb = check_wiki_page(kp)
            if link:
                kp_obj.wiki_link = link
                kp_obj.disambiguation = dsmb
            kp_obj.save()
            print(f'Key added to DB: {kp_obj.kp_content}')

        kp_list.append(kp_obj)
    
    serialized = KpSerializer(kp_list, many=True)
    
    return serialized.data
