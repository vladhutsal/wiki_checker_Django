import wikipedia as wiki
from wikipedia.exceptions import DisambiguationError, PageError


def check_disambiguation(kp):
    for result in wiki.search(kp):
        if 'disambiguation' in result:
            return True
    return False


def check_wiki_page(keyphrase):
    try:
        try:
            print('Checking Wiki...')
            wiki_page = wiki.page(keyphrase)
        except DisambiguationError as e:
            wiki_page = wiki.page(e.args[1][0])

        if wiki_page:
            url = wiki_page.url
            dsmb = check_disambiguation(keyphrase)
            return url, dsmb
        else:
            raise PageError
        
    except PageError:
        return None, False
        