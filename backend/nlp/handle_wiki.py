import wikipedia as wiki
from wikipedia import WikipediaPage as WikiPage
from wikipedia.exceptions import DisambiguationError, PageError


def check_disambiguation(wiki_results):
    for result in wiki_results:
        if 'disambiguation' in result:
            return True
    return False


def get_wiki_page(page_name):
    try:
        res = wiki.page(page_name)
    except DisambiguationError as e:
        best_related = e.args[1][0]
        res = wiki.page(best_related)

    return res


def check_page_for_keyphrase(bm, kp):
    page_content = get_wiki_page(bm).content
    return True if kp in page_content else False


def check_wiki_page(keyphrase):
    try:
        wiki_results = wiki.search(keyphrase)
        best_match = wiki_results[0]

        url = get_wiki_page(keyphrase).url
        disambiguation = False

        if best_match == keyphrase:
            disambiguation = check_disambiguation(wiki_results)

        elif check_page_for_keyphrase(best_match, keyphrase):
            url = get_wiki_page(best_match).url
        
        else:
            url = None
            
        return url, disambiguation

    except PageError:
        return None, False