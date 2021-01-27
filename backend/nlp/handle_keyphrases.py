from .handle_wiki import check_wiki_page

from api.models import Keyphrase

import nltk
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize


def clean_keyphrases(kp_list):
    lem_list = []
    lem = WordNetLemmatizer()

    for phrase in kp_list:
        if ' ' in phrase:
            lem_phrase = [lem.lemmatize(word) for word in phrase.split(' ')]
            lem_list.append(' '.join(lem_phrase))
        else:
            lem_list.append(lem.lemmatize(phrase))

    return set(lem_list)


def extract_keyphrases(text):
    keyphrases = []

    grammar = r'''
        KEY: {<NN.*|JJ>*<NN.*>}  
        NGRAM: {<KEY><IN><KEY>}
    '''

    chunker = nltk.RegexpParser(grammar)
    tokenized_words = word_tokenize(text)
    tagged_words = nltk.pos_tag(tokenized_words)
    tree = chunker.parse(tagged_words)

    for st in tree.subtrees(filter=lambda t: t.label()=='NGRAM' or t.label()=='KEY'):
        acceptable_words_list = st.leaves()
        word_list = ' '.join([word[0] for word in acceptable_words_list])
        keyphrases.append(word_list)
    
    set_of_cleaned_kp = clean_keyphrases(keyphrases)

    return list(set_of_cleaned_kp)


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
            kp_obj.disambiguous = dsmb

            kp_obj.save()
            print(f'Key added to DB: {kp_obj.kp_content}')

        kp_list.append(kp_obj)
    
    return kp_list
