import wikipedia as wiki
from wikipedia.exceptions import DisambiguationError, PageError


def check_disambiguation(kp):
    for result in wiki.search(kp):
        if 'disambiguation' in result:
            return False
    return True


def check_wiki_page(keyphrase):
    try: 
        try:
            url = wiki.page(keyphrase).url
            dsmb = check_disambiguation(keyphrase)
        except DisambiguationError:
            url = None
            dsmb = False
        return url, dsmb
        
    except PageError:
        return None, None
    