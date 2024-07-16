---
title: 'Ivan the Crawler'
description: 'This week I put together a website crawler using Python. There’s a couple variations of the script, it can be repurposed for just about anything that anyone needs to crawl/automate our public facing assets.'
author: Asim
pubDate: 03/15/2024
tags: 'crawler, bot, python, py, Ivan'
thumbnail: dev
background: '/Media/blog/placeholder.jpg'
--- 

This week I put together a website crawler using Python. There’s a couple variations of the script, it can be repurposed for just about anything that anyone needs to crawl/automate our public facing assets.

This project contains three Python scripts designed for web crawling purposes. The first, `ivan.py`, is tailored for single source/page crawling, ideal for checking a specific page for broken links or patterns. The second, `ivan-crawl-all.py`, extends this functionality to crawl entire websites, identifying broken links and pattern matches across all accessible pages from a given starting URL. The third, `ivan-crawl-all-sanitized.py`, further enhances the entire website crawling by implementing sanitized data handling, ensuring more efficient and focused crawling by filtering out irrelevant or redundant data.

*Note: Keep in mind that this is a simple python crawler method that can be repurposed for whatever task you might need* 

## Features

**Single Page Crawler ("ivan.py"):**
    - Crawls a specified single web page.
    - Identifies and logs broken links found on the page.
    - Searches for and logs specific patterns within the page URLs.

- **Entire Website Crawler ("ivan-crawl-all.py"):**
    - Crawls an entire website starting from a specified URL.
    - Recursively follows all internal links to cover the entire website.
    - Logs broken links and pattern matches found across the site.
    - Organizes output into readable blocks for each crawled URL.

- **Entire Website Crawler with Data Sanitization ("ivan-crawl-all-sanitized.py"):**
    - Offers all the features of "ivan-crawl-all.py".
    - Includes advanced data sanitization to avoid processing non-essential content like documents, images, and external links, making the crawling process more efficient.

## Requirements

- Python 3.x
- BeautifulSoup4
- Requests
- termcolor

## Installation

Ensure Python 3.x is installed on your system. Then, install the required packages using `pip`:

```bash
pip install beautifulsoup4 requests termcolor
```

## Usage

### Single Page Crawler ("ivan.py")

1. **Configure the script:** Edit the `ivan.py` file to specify the URL you wish to crawl and, optionally, a pattern to search for within the page.

2. **Run the script:**

```bash
python ivan.py
```

### Entire Website Crawler ("ivan-crawl-all.py")

1. **Configure the script:** Edit the `ivan-crawl-all.py` file to specify the starting URL for the website crawl and, optionally, a pattern to search for across the site.

2. **Run the script:**

```bash
python ivan-crawl-all.py
```

### Entire Website Crawler with Data Sanitization ("ivan-crawl-all-sanitized.py")

1. **Configure the script:** Similar to `ivan-crawl-all.py`, edit the `ivan-crawl-all-sanitized.py` file to specify the starting URL and optional pattern. This version will automatically filter out non-essential content for a more focused crawl.

2. **Run the script:**

```bash
python ivan-crawl-all-sanitized.py
```

## Review the Output

Each crawler will generate a timestamped output file in the same directory, named according to the script run (`crawl-YYYYMMDD-HHMMSS.txt`, `crawl-all-YYYYMMDD-HHMMSS.txt`, or `crawl-all-sanitized-YYYYMMDD-HHMMSS.txt`). Open these files to review the crawl results.

- `YYYYMMDD` - year, month, day
- `HHMMSS` - hour, minutes, seconds

### Log Output Example

```bash
$ python ivan.py
========================================
Crawl Start Time: 2024-03-14 15:13:31
Crawling: https://ww2.valleyair.org/landing
----------------------------------------
Pattern match found: https://www.valleyair.org/busind/comply/source_testing.htm
Pattern match found: https://www.valleyair.org/videos/video_idx.htm
Pattern match found: https://www.valleyair.org/General_Info/AGLoader.htm
Pattern match found: https://www.valleyair.org/Programs/CCAP/bps/BPS_idx.htm
Error fetching https://ww2.valleyair.org/permitting/permit-exempt-equipment-registration-peer/ : 404 Client Error: Not Found for url: https://ww2.valleyair.org/permitting/permit-exempt-equipment-registration-peer/%20
Pattern match found: https://www.valleyair.org/Symposiums/symposiums_idx.htm
Pattern match found: https://www.valleyair.org/Programs/SpecialCitySelection/SCSC_idx.htm
Error fetching https://twitter.com/ValleyAir: 400 Client Error: Bad Request for url: https://twitter.com/ValleyAir
----------------------------------------
Crawl End Time: 2024-03-14 15:13:43
Finished crawling.
========================================
Total Pages Crawled: 1
Total Broken Links Found: 2
Total Pattern Matches Found: 6
```

## Customizing the Crawler

- **Starting URL:** Change the `start_url` variable to the URL where you want the crawl to begin.
- **Pattern Matching:** Modify the `pattern` variable with the regex pattern for the links you're interested in.
- **Visual Breaks:** Adjust the characters and length of `insert_visual_break` and `insert_minor_visual_break` functions for custom visual separators in the log.

## The scripts

### ivan.py

```py
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin
from termcolor import colored
import datetime

# Initialize counters
visited = set()
broken_links_count = 0
pattern_matches_count = 0

# Open an output file
output_file_name = 'crawl-' + datetime.datetime.now().strftime("%Y%m%d-%H%M%S") + '.txt'
output_file = open(output_file_name, 'w')

def log_message(message, color=None, to_console=True, to_file=True, include_timestamp=True):
    if include_timestamp:
        time_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        formatted_message = f"{time_str} - {message}"
    else:
        formatted_message = message
    
    if to_console:
        if color:
            print(colored(formatted_message, color))
        else:
            print(formatted_message)
            
    if to_file:
        output_file.write(formatted_message + "\n")

def insert_visual_break(to_console=True, to_file=True):
    break_line = "=" * 40  
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def insert_minor_visual_break(to_console=True, to_file=True):
    break_line = "-" * 40  
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def fetch_page(url):
    global broken_links_count
    if not url.startswith(('http://', 'https://')):
        return None  # Skip non-HTTP/HTTPS URLs

    try:
        response = requests.get(url, timeout=5)
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        log_message(f"Error fetching {url}: {e}", "red", include_timestamp=False)
        broken_links_count += 1
        return None

def validate_links(base_url, html_content, pattern=None):
    global pattern_matches_count
    soup = BeautifulSoup(html_content, 'html.parser')

    for link in soup.find_all('a', href=True):
        href = link['href'].split('#')[0]  # Remove fragment identifiers

        # Skip non-HTTP/HTTPS URLs, including tel:, mailto:, etc.
        if href.startswith(('tel:', 'mailto:')):
            continue

        url = urljoin(base_url, href)

        if url in visited:
            continue  # Skip already visited URLs

        visited.add(url)  # Mark the URL as visited

        if pattern and re.search(pattern, url):
            log_message(f"Pattern match found: {url}", "green", include_timestamp=False)
            pattern_matches_count += 1
        else:
            fetch_page(url)  # Fetch page only if it's not a pattern match to avoid unnecessary requests

def crawl_website(start_url, pattern=None):
    insert_visual_break()
    global visited
    start_time = datetime.datetime.now()
    log_message(f"Crawl Start Time: {start_time.strftime('%Y-%m-%d %H:%M:%S')}", include_timestamp=False)
    log_message(f"Crawling: {start_url}", include_timestamp=False)
    insert_minor_visual_break()
    visited.add(start_url)
    content = fetch_page(start_url)
    if content:
        validate_links(start_url, content, pattern)
    end_time = datetime.datetime.now()
    insert_minor_visual_break()
    log_message(f"Crawl End Time: {end_time.strftime('%Y-%m-%d %H:%M:%S')}", include_timestamp=False)
    log_message("Finished crawling.", include_timestamp=False)

if __name__ == "__main__":
    start_url = "https://www.yourdomain.com/"
    pattern = r"^https://www\.yourdomain\.com/"
    crawl_website(start_url, pattern)

    # Insert a visual break before summaries
    insert_visual_break()

    # Print summaries
    log_message(f"Total Pages Crawled: {len(visited)}", include_timestamp=False)
    log_message(f"Total Broken Links Found: {broken_links_count}", "red", include_timestamp=False)
    log_message(f"Total Pattern Matches Found: {pattern_matches_count}", "green", include_timestamp=False)

    # Close the output file
    output_file.close()
```

### ivan-crawl-all.py

```py
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin, urlparse
from termcolor import colored
import datetime
from collections import deque

# Initialize counters and structures
visited = set()
broken_links_count = 0
pattern_matches_count = 0
queue = deque()

# List of excluded file extensions
excluded_extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png', '.gif', '.svg', '.kml', '.kmz', '.zip']

# Open an output file
output_file_name = 'crawl-all-' + datetime.datetime.now().strftime("%Y%m%d-%H%M%S") + '.txt'
output_file = open(output_file_name, 'w')

def log_message(message, color=None, to_console=True, to_file=True):
    if to_console:
        if color:
            print(colored(message, color))
        else:
            print(message)

    if to_file:
        output_file.write(message + "\n")

def insert_visual_break(to_console=True, to_file=True):
    break_line = "=" * 40
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def insert_minor_visual_break(to_console=True, to_file=True):
    break_line = "-" * 40
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def is_internal_link(link, start_url):
    return urlparse(link).netloc == urlparse(start_url).netloc

def fetch_page(url):
    global broken_links_count

    # Skip non-HTTP/HTTPS URLs, such as tel: or mailto:
    if not url.startswith(('http://', 'https://')):
        return None

    # Check if the URL ends with an excluded extension
    if any(url.lower().endswith(ext) for ext in excluded_extensions):
        return None

    try:
        response = requests.get(url, timeout=5)
        if 'text/html' not in response.headers.get('Content-Type', ''):
            log_message(f"Skipped non-HTML content at {url}", color="yellow")
            return None

        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        log_message(f"Error fetching {url}: {e}", color="red")
        broken_links_count += 1
        return None

def process_links(base_url, html_content, pattern=None):
    global pattern_matches_count
    found_matches = False
    soup = BeautifulSoup(html_content, 'html.parser')

    for link in soup.find_all('a', href=True):
        href = link['href'].split('#')[0]  # Remove fragment identifiers

        # Skip non-HTTP/HTTPS URLs, including tel:, mailto:, etc.
        if href.startswith(('tel:', 'mailto:')):
            continue

        url = urljoin(base_url, href)

        if url in visited or any(url.lower().endswith(ext) for ext in excluded_extensions):
            continue

        visited.add(url)  # Mark the URL as visited

        if pattern and re.search(pattern, url):
            if not found_matches:
                insert_minor_visual_break()
                log_message(f"Pattern matches on: {base_url}", color="magenta")
                found_matches = True
            log_message(f"   Pattern match: {url}", color="green")
            pattern_matches_count += 1

        if is_internal_link(url, start_url):
            queue.append(url)

def crawl_website(start_url, pattern=None):
    global visited
    queue.append(start_url)
    visited.add(start_url)

    while queue:
        current_url = queue.popleft()
        insert_minor_visual_break()
        log_message(f"Crawling: {current_url}", "cyan")
        content = fetch_page(current_url)
        if content:
            process_links(current_url, content, pattern)

if __name__ == "__main__":
    try:
        start_time = datetime.datetime.now()
        start_url = "http://yourdomain.com/"
        pattern = r"https?://www\.yourdomain\.com/"
        
        insert_visual_break()
        log_message(f"Crawl Start Time: {start_time.strftime('%Y-%m-%d %H:%M:%S')}", "blue")
        crawl_website(start_url, pattern)
    except Exception as e:
        log_message(f"An unexpected error occurred: {e}", "red")
    finally:
        insert_minor_visual_break()
        end_time = datetime.datetime.now()
        log_message(f"Crawl End Time: {end_time.strftime('%Y-%m-%d %H:%M:%S')}", "blue")
        log_message("Finished crawling.", "blue")

        insert_visual_break()
        log_message(f"Total Pages Crawled: {len(visited)}", "magenta")
        log_message(f"Total Broken Links Found: {broken_links_count}", "red")
        log_message(f"Total Pattern Matches Found: {pattern_matches_count}", "green")

        output_file.close()
```

### ivan-crawl-all-sanitized.py

```py
import requests
from bs4 import BeautifulSoup
import re
from urllib.parse import urljoin, urlparse
from termcolor import colored
import datetime
from collections import deque

# Initialize counters and structures
visited = set()
broken_links_count = 0
pattern_matches_count = 0
queue = deque()

# List of excluded file extensions
excluded_extensions = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.png', '.gif', '.svg', '.kml', '.kmz', '.zip']

# Open an output file
output_file_name = 'crawl-all-sanitized-' + datetime.datetime.now().strftime("%Y%m%d-%H%M%S") + '.txt'
output_file = open(output_file_name, 'w')

def log_message(message, color=None, to_console=True, to_file=True):
    if to_console and color:
        print(colored(message, color))
    elif to_console:
        print(message)
    if to_file:
        output_file.write(message + "\n")

def insert_visual_break(to_console=True, to_file=True):
    break_line = "=" * 40
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def insert_minor_visual_break(to_console=True, to_file=True):
    break_line = "-" * 40
    if to_console:
        print(break_line)
    if to_file:
        output_file.write(break_line + "\n")

def is_internal_link(link, start_url):
    return urlparse(link).netloc == urlparse(start_url).netloc

def fetch_page(url):
    global broken_links_count
    if any(url.lower().endswith(ext) for ext in excluded_extensions) or '#googtrans' in url:
        return None

    try:
        response = requests.get(url, timeout=5)
        if 'text/html' not in response.headers.get('Content-Type', ''):
            return None
        response.raise_for_status()
        return response.text
    except requests.RequestException as e:
        insert_minor_visual_break()
        log_message(f"Error fetching {url}: {e}", color="red")
        broken_links_count += 1
        return None

def process_links(base_url, html_content, pattern=None):
    global pattern_matches_count
    found_matches = False
    soup = BeautifulSoup(html_content, 'html.parser')

    for link in soup.find_all('a', href=True):
        href = link['href'].split('#')[0]  # Remove fragment identifiers

        # Skip non-HTTP/HTTPS URLs, including tel:, mailto:, etc.
        if href.startswith(('tel:', 'mailto:')):
            continue

        # Ensure the href is a properly formatted URL
        if not href.startswith(('http://', 'https://', '/')):
            href = '/' + href

        url = urljoin(base_url, href)

        # Skip if the URL has already been visited or matches an excluded extension
        if url in visited or any(url.lower().endswith(ext) for ext in excluded_extensions):
            continue

        visited.add(url)  # Mark the URL as visited

        if pattern and re.search(pattern, url):
            if not found_matches:
                insert_minor_visual_break()
                log_message(f"Pattern matches on: {base_url}", color="magenta")
                found_matches = True
            log_message(f"   Pattern match: {url}", color="green")
            pattern_matches_count += 1

        if is_internal_link(url, start_url):  # Check against the original start_url
            queue.append(url)

def crawl_website(start_url, pattern=None):
    global visited
    queue.append(start_url)
    visited.add(start_url)

    while queue:
        current_url = queue.popleft()
        content = fetch_page(current_url)
        if content:
            process_links(current_url, content, pattern)

if __name__ == "__main__":
    try:
        start_time = datetime.datetime.now()
        start_url = "https://www.yourdomain.com/"
        pattern = r"https?://www\.yourdomain\.com/"
        
        insert_visual_break()
        log_message(f"Crawl Start Time: {start_time.strftime('%Y-%m-%d %H:%M:%S')}", color="blue")
        crawl_website(start_url, pattern)
    except Exception as e:
        log_message(f"An unexpected error occurred: {e}", color="red")
    finally:
        insert_minor_visual_break()
        end_time = datetime.datetime.now()
        log_message(f"Crawl End Time: {end_time.strftime('%Y-%m-%d %H:%M:%S')}", color="blue")
        log_message("Finished crawling.", color="blue")

        insert_visual_break()
        log_message(f"Total Pages Crawled: {len(visited)}", color="magenta")
        log_message(f"Total Broken Links Found: {broken_links_count}", color="red")
        log_message(f"Total Pattern Matches Found: {pattern_matches_count}", color="green")

        output_file.close()
```