import os
import codecs

from .handle_wiki import check_wiki_page

from api.models import Keyphrase
from api.serializers import KpSerializer

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize


def clean_keyphrases(kp_list):
    res_list = []
    lem_list = []
    lem = WordNetLemmatizer()

    for phrase in kp_list:
        if ' ' in phrase:
            lem_phrase = [lem.lemmatize(word) for word in phrase.split(' ')]
            lem_list.append(' '.join(lem_phrase))
        else:
            lem_list.append(lem.lemmatize(phrase))

    nlp_dir_path = os.getcwd()
    stop_words_txt = codecs.open(f'{nlp_dir_path}/nlp/stop_words.txt').read()
    stop_words = set(stop_words_txt.replace('\n', ' ').split(' '))

    for phrase in lem_list:
        if phrase not in stop_words:    
            res_list.append(phrase)
    return res_list


def extract_keyphrases(text):
    keyphrases = []

    grammar = r"""
        NBAR:
            {<NN.*|JJ>*<NN.*>}  # Nouns and Adjectives, terminated with Nouns
            
        NP:
            {<NBAR>}
            {<NBAR><IN><NBAR>}  # Above, connected with in/of/etc...
    """

    chunker = nltk.RegexpParser(grammar)
    tokenized_words = word_tokenize(text)
    tagged_words = nltk.pos_tag(tokenized_words)
    tree = chunker.parse(tagged_words)

    for st in tree.subtrees(filter=lambda t: t.label()=='NP'):
        acceptable_words_list = st.leaves()
        word_list = ' '.join([word[0] for word in acceptable_words_list])
        keyphrases.append(word_list)

    return clean_keyphrases(keyphrases)


# def extract_keyphrases(text):
#     rake_object = Rake(language='english', max_length=2)
#     rake_object.extract_keywords_from_text(text)
#     keyphrases = rake_object.get_ranked_phrases()
#     return clean_keyphrases(keyphrases)


def handle_keyphrases(text):
    kp_list = []
    keyphrases = extract_keyphrases(text)
    for kp in keyphrases:
        try:
            kp_obj = Keyphrase.objects.get(kp_content=kp)
            kp_obj.score += 1
            kp_obj.save()
            print(f'Score increased for {kp_obj.kp_content}')

        except Keyphrase.DoesNotExist:
            kp_obj = Keyphrase.objects.create(kp_content=kp)
            link, dsmb = check_wiki_page(kp)
            kp_obj.wiki_link = link
            kp_obj.disambiguation = dsmb

            kp_obj.save()
            print(f'Key added to DB: {kp_obj.kp_content}')

        kp_list.append(kp_obj)
    
    serialized = KpSerializer(kp_list, many=True)
    
    return serialized.data
