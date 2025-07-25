import os
from pathlib import Path

from string import Template

TEMPLATE = Template("""<!DOCTYPE html>
<html lang=\"en\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
  <title>$state Courier & Delivery Services | Cordova Courier</title>
  <meta name=\"description\" content=\"Cordova Courier offers reliable courier, freight, and medical delivery services throughout $state. Serving major cities and surrounding areas within a 50-mile radius.\" />
  <link rel=\"stylesheet\" href=\"/css/master-service.css?v=1.0\" />
  <link rel=\"stylesheet\" href=\"/css/navbar.css?v=1.0\" />
  <link rel=\"stylesheet\" href=\"/css/footer.css?v=1.0\" />
  <link href=\"/images/branding/favicon.ico\" rel=\"icon\" type=\"image/x-icon\"/>
  <link href=\"/images/branding/favicon-32x32.png\" rel=\"icon\" sizes=\"32x32\" type=\"image/png\"/>
  <link href=\"/images/branding/favicon-16x16.png\" rel=\"icon\" sizes=\"16x16\" type=\"image/png\"/>
  <link href=\"/images/branding/apple-touch-icon.png\" rel=\"apple-touch-icon\" sizes=\"180x180\"/>
  <link href=\"/site.webmanifest\" rel=\"manifest\"/>
  <meta content=\"#ffffff\" name=\"theme-color\"/>
  <script type=\"application/ld+json\">
  {{
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {{
        "@type": "Question",
        "name": "Do you offer same-day delivery in rural $state?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Yes, we serve many rural locations within a 50-mile radius of major cities across $state."
        }}
      }},
      {{
        "@type": "Question",
        "name": "Are your drivers TSA certified for airport pickups?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "Absolutely. All Cordova Courier drivers handling airport freight are TSA-certified for secure air cargo handling."
        }}
      }},
      {{
        "@type": "Question",
        "name": "What types of items can you deliver?",
        "acceptedAnswer": {{
          "@type": "Answer",
          "text": "We deliver everything from legal documents and medical supplies to pallets of freight and airport cargo."
        }}
      }}
    ]
  }}
  </script>
</head>
<body>
<div id=\"navbar-placeholder\"></div>
<script>
  fetch('/components/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
      const script = document.createElement('script');
      script.src = '/js/navbar.js';
      script.onload = () => {
        const checkAndRun = () => {
          const hamburger = document.getElementById('hamburgerBtn');
          const menu = document.getElementById('mobileMenu');
          const navbar = document.getElementById('navbar');
          if (hamburger && menu && navbar && window.setupMobileMenuToggle && window.setupNavbarScrollAndToggle) {
            window.setupNavbarScrollAndToggle();
            window.setupMobileMenuToggle();
          } else {
            requestAnimationFrame(checkAndRun);
          }
        };
        checkAndRun();
      };
      document.body.appendChild(script);
    });
</script>
<div class=\"hero-section\">
  <nav aria-label=\"Breadcrumb\" class=\"breadcrumb-nav\">
    <ul class=\"breadcrumb\">
      <li><a href=\"/\">Home</a></li>
      <li><a href=\"/service-areas/\">Service Areas</a></li>
      <li><a href=\"/service-areas/north-america/usa\">United States</a></li>
      <li>$state</li>
    </ul>
  </nav>
  <h1>$state Courier & Delivery Services</h1>
  <p>Fast, reliable same-day, freight, and medical deliveries throughout $state.</p>
  <div class=\"cta-buttons\">
    <a href=\"#coverage\" class=\"btn\">View Coverage</a>
    <a href=\"/quote\" class=\"btn\">Request a Quote</a>
  </div>
</div>
<section class=\"services-row\">
  <h2>Our $state Courier Services</h2>
  <div class=\"icons\">
    <div><img src=\"/images/icons/same-day.svg\" alt=\"Same-Day Delivery\"><span>Same-Day</span></div>
    <div><img src=\"/images/icons/medical.svg\" alt=\"Medical Courier\"><span>Medical</span></div>
    <div><img src=\"/images/icons/freight.svg\" alt=\"Freight Delivery\"><span>Freight</span></div>
    <div><img src=\"/images/icons/airport.svg\" alt=\"Airport Pickup\"><span>Airport</span></div>
    <div><img src=\"/images/icons/routed.svg\" alt=\"Routed Scheduled Delivery\"><span>Routed & Scheduled</span></div>
    <div><img src=\"/images/icons/last-mile.svg\" alt=\"Last-Mile Delivery\"><span>Last-Mile</span></div>
    <div><img src=\"/images/icons/nationwide.svg\" alt=\"Expedited Nationwide Delivery\"><span>Expedited Nationwide</span></div>
  </div>
</section>
<section id=\"coverage\" class=\"grid-section\">
  <h2>Statewide Coverage in $state</h2>
  <p style=\"max-width: 800px; margin: 0 auto 30px auto; font-size: 1.1rem;\">
    Cordova Courier proudly serves all of $state's major cities and surrounding areas within a 50-mile radius. We also provide same-day delivery to and from $state airports, businesses, homes, and government offices.
  </p>
  <div class=\"state-grid\">
    $city_links
  </div>
</section>
<section id=\"airports\" class=\"grid-section\">
  <h2>$state Airport Courier Services</h2>
  <p style=\"max-width: 900px; margin: 0 auto 30px auto; font-size: 1.1rem;\">
    Cordova Courier provides secure, TSA-certified pickup and delivery services from major airports across $state. Whether it's time-sensitive freight, medical shipments, or legal cargo, we ensure rapid transport and chain-of-custody tracking.
  </p>
  <div class=\"state-grid\">
    $airport_links
  </div>
</section>
<section id=\"faq\" class=\"grid-section\">
  <h2>$state Courier Services – FAQs</h2>
  <div class=\"state-grid\">
    <div>
      <strong>Do you offer same-day delivery in rural $state?</strong><br />
      Yes, we serve many rural locations within a 50-mile radius of major cities across $state.
    </div>
    <div>
      <strong>Are your drivers TSA certified for airport pickups?</strong><br />
      Absolutely. All Cordova Courier drivers handling airport freight are TSA-certified for secure air cargo handling.
    </div>
    <div>
      <strong>What types of items can you deliver?</strong><br />
      We deliver everything from legal documents and medical supplies to pallets of freight and airport cargo.
    </div>
  </div>
</section>
<section id=\"government-contracting\" class=\"grid-section\">
  <h2>Government Contracting & Federal Courier Services in $state</h2>
  <p style=\"max-width: 900px; margin: 0 auto 30px auto; font-size: 1.1rem;\">
    Cordova Courier is a verified federal contractor with active registrations in SAM.gov and SBA. We proudly support federal, state, and local agencies across $state with secure, compliant courier services — including urgent deliveries to government offices, courthouses, and military facilities.
  </p>
  <div class=\"state-grid\">
    <div><strong>UEI:</strong> PUUWGLPBLZU6</div>
    <div><strong>CAGE Code:</strong> 9MNG2</div>
    <div><strong>NAICS:</strong> 492110 – Courier and Express Delivery Services</div>
    <div><strong>PSC:</strong> R602 – Courier/Messenger Support</div>
    <div><strong>PSC:</strong> R706 – Logistics Support</div>
  </div>
  <p style=\"text-align: center; margin-top: 20px;\">
    <a href=\"/about-us/government-contractor\" class=\"btn\">Learn More</a>
  </p>
</section>
<section id=\"reviews\" class=\"grid-section\">
  <h2>What Our Customers Say</h2>
  <div class=\"state-grid\">
    <div>
      <strong>⭐ ⭐ ⭐ ⭐ ⭐</strong><br />
      “Cordova Courier has been a lifesaver for our business in $example_city. Highly recommended.”<br />
      <em>– Local Business Owner, $example_city, $abbr</em>
    </div>
    <div>
      <strong>⭐ ⭐ ⭐ ⭐ ⭐</strong><br />
      “Excellent communication and fast delivery across $state."<br />
      <em>– Satisfied Customer</em>
    </div>
    <div>
      <strong>⭐ ⭐ ⭐ ⭐ ⭐</strong><br />
      “Reliable and professional courier service.”<br />
      <em>– Logistics Coordinator</em>
    </div>
  </div>
</section>
<section id=\"trust-seals\" class=\"grid-section\">
  <h2>Trusted Courier Partner</h2>
  <div style=\"text-align: center; margin-top: 20px;\">
    <a href=\"https://www.bbb.org/us/ca/manteca/profile/couriers/cordova-courier-llc-1156-90089217/#sealclick\" target=\"_blank\" rel=\"nofollow\">
      <img
        src=\"https://seal-necal.bbb.org/seals/blue-seal-200-42-bbb-90089217.png\"
        loading=\"lazy\"
        style=\"border: 0;\"
        alt=\"Cordova Courier LLC BBB Business Review\" />
    </a>
  </div>
</section>
<div id=\"footer-placeholder\"></div>
<script defer>
  fetch('/components/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-placeholder').innerHTML = html;
    });
</script>
</body>
</html>
""")

states = {
    "alabama": {
        "abbr": "AL",
        "cities": ["Birmingham", "Montgomery", "Huntsville", "Mobile"],
        "airports": {
            "bhm": "BHM – Birmingham-Shuttlesworth",
            "hsv": "HSV – Huntsville",
            "mgm": "MGM – Montgomery",
            "mob": "MOB – Mobile"
        }
    },
    "arizona": {
        "abbr": "AZ",
        "cities": ["Phoenix", "Tucson", "Mesa", "Scottsdale"],
        "airports": {
            "phx": "PHX – Phoenix Sky Harbor",
            "tus": "TUS – Tucson",
            "aza": "AZA – Phoenix-Mesa Gateway",
            "flg": "FLG – Flagstaff Pulliam"
        }
    },
    "california": {
        "abbr": "CA",
        "cities": ["Los Angeles", "San Diego", "San Francisco", "Sacramento"],
        "airports": {
            "lax": "LAX – Los Angeles",
            "sfo": "SFO – San Francisco",
            "san": "SAN – San Diego",
            "smf": "SMF – Sacramento"
        },
        "skip": True
    },
    "colorado": {
        "abbr": "CO",
        "cities": ["Denver", "Colorado Springs", "Aurora", "Boulder"],
        "airports": {
            "den": "DEN – Denver",
            "cos": "COS – Colorado Springs",
            "gjt": "GJT – Grand Junction",
            "ase": "ASE – Aspen"
        }
    },
    "connecticut": {
        "abbr": "CT",
        "cities": ["Bridgeport", "New Haven", "Hartford", "Stamford"],
        "airports": {
            "bdl": "BDL – Bradley",
            "hvn": "HVN – Tweed-New Haven",
            "bdr": "BDR – Bridgeport",
            "hfd": "HFD – Hartford"
        }
    },
    "florida": {
        "abbr": "FL",
        "cities": ["Miami", "Orlando", "Tampa", "Jacksonville"],
        "airports": {
            "mia": "MIA – Miami",
            "mco": "MCO – Orlando",
            "tpa": "TPA – Tampa",
            "jax": "JAX – Jacksonville"
        }
    },
    "georgia": {
        "abbr": "GA",
        "cities": ["Atlanta", "Augusta", "Savannah", "Macon"],
        "airports": {
            "atl": "ATL – Atlanta",
            "sav": "SAV – Savannah",
            "ags": "AGS – Augusta",
            "ahn": "AHN – Athens"
        }
    },
    "illinois": {
        "abbr": "IL",
        "cities": ["Chicago", "Aurora", "Springfield", "Naperville"],
        "airports": {
            "ord": "ORD – Chicago O'Hare",
            "mdw": "MDW – Chicago Midway",
            "bmi": "BMI – Bloomington",
            "pia": "PIA – Peoria"
        }
    },
    "indiana": {
        "abbr": "IN",
        "cities": ["Indianapolis", "Fort Wayne", "Evansville", "South Bend"],
        "airports": {
            "ind": "IND – Indianapolis",
            "fwa": "FWA – Fort Wayne",
            "evv": "EVV – Evansville",
            "sbn": "SBN – South Bend"
        }
    },
    "iowa": {
        "abbr": "IA",
        "cities": ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City"],
        "airports": {
            "dsm": "DSM – Des Moines",
            "cid": "CID – Cedar Rapids",
            "sux": "SUX – Sioux City",
            "alo": "ALO – Waterloo"
        }
    },
    "kentucky": {
        "abbr": "KY",
        "cities": ["Louisville", "Lexington", "Bowling Green", "Owensboro"],
        "airports": {
            "sdf": "SDF – Louisville",
            "cvg": "CVG – Cincinnati/N Kentucky",
            "lex": "LEX – Lexington",
            "bwg": "BWG – Bowling Green"
        }
    },
    "louisiana": {
        "abbr": "LA",
        "cities": ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette"],
        "airports": {
            "msy": "MSY – New Orleans",
            "btr": "BTR – Baton Rouge",
            "shv": "SHV – Shreveport",
            "lft": "LFT – Lafayette"
        }
    },
    "maryland": {
        "abbr": "MD",
        "cities": ["Baltimore", "Frederick", "Rockville", "Annapolis"],
        "airports": {
            "bwi": "BWI – Baltimore/Washington",
            "iad": "IAD – Dulles",
            "dca": "DCA – Reagan",
            "hgr": "HGR – Hagerstown"
        }
    },
    "massachusetts": {
        "abbr": "MA",
        "cities": ["Boston", "Worcester", "Springfield", "Cambridge"],
        "airports": {
            "bos": "BOS – Boston",
            "orh": "ORH – Worcester",
            "mvy": "MVY – Martha's Vineyard",
            "ack": "ACK – Nantucket"
        }
    },
    "michigan": {
        "abbr": "MI",
        "cities": ["Detroit", "Grand Rapids", "Ann Arbor", "Lansing"],
        "airports": {
            "dtw": "DTW – Detroit",
            "grr": "GRR – Grand Rapids",
            "fnt": "FNT – Flint",
            "lan": "LAN – Lansing"
        }
    },
    "missouri": {
        "abbr": "MO",
        "cities": ["Kansas City", "St. Louis", "Springfield", "Columbia"],
        "airports": {
            "stl": "STL – St. Louis",
            "mci": "MCI – Kansas City",
            "sgf": "SGF – Springfield",
            "cou": "COU – Columbia"
        }
    },
    "nebraska": {
        "abbr": "NE",
        "cities": ["Omaha", "Lincoln", "Bellevue", "Grand Island"],
        "airports": {
            "oma": "OMA – Omaha",
            "lnk": "LNK – Lincoln",
            "gri": "GRI – Grand Island",
            "lbf": "LBF – North Platte"
        }
    },
    "nevada": {
        "abbr": "NV",
        "cities": ["Las Vegas", "Reno", "Henderson", "Carson City"],
        "airports": {
            "las": "LAS – Las Vegas",
            "rno": "RNO – Reno",
            "eko": "EKO – Elko",
            "ifp": "IFP – Bullhead City"
        }
    },
    "new-mexico": {
        "abbr": "NM",
        "cities": ["Albuquerque", "Santa Fe", "Las Cruces", "Roswell"],
        "airports": {
            "abq": "ABQ – Albuquerque",
            "saf": "SAF – Santa Fe",
            "row": "ROW – Roswell",
            "fmn": "FMN – Four Corners"
        }
    },
    "new-york": {
        "abbr": "NY",
        "cities": ["New York City", "Buffalo", "Rochester", "Albany"],
        "airports": {
            "jfk": "JFK – New York",
            "lga": "LGA – LaGuardia",
            "buf": "BUF – Buffalo",
            "alb": "ALB – Albany"
        }
    },
    "north-carolina": {
        "abbr": "NC",
        "cities": ["Charlotte", "Raleigh", "Greensboro", "Durham"],
        "airports": {
            "clt": "CLT – Charlotte",
            "rdu": "RDU – Raleigh-Durham",
            "gso": "GSO – Greensboro",
            "avl": "AVL – Asheville"
        }
    },
    "ohio": {
        "abbr": "OH",
        "cities": ["Columbus", "Cleveland", "Cincinnati", "Toledo"],
        "airports": {
            "cmh": "CMH – Columbus",
            "cle": "CLE – Cleveland",
            "day": "DAY – Dayton",
            "tol": "TOL – Toledo"
        }
    },
    "oklahoma": {
        "abbr": "OK",
        "cities": ["Oklahoma City", "Tulsa", "Norman", "Lawton"],
        "airports": {
            "okc": "OKC – Oklahoma City",
            "tul": "TUL – Tulsa",
            "law": "LAW – Lawton",
            "swo": "SWO – Stillwater"
        }
    },
    "oregon": {
        "abbr": "OR",
        "cities": ["Portland", "Eugene", "Salem", "Bend"],
        "airports": {
            "pdx": "PDX – Portland",
            "eug": "EUG – Eugene",
            "mfr": "MFR – Medford",
            "rdm": "RDM – Redmond"
        }
    },
    "pennsylvania": {
        "abbr": "PA",
        "cities": ["Philadelphia", "Pittsburgh", "Harrisburg", "Allentown"],
        "airports": {
            "phl": "PHL – Philadelphia",
            "pit": "PIT – Pittsburgh",
            "mdt": "MDT – Harrisburg",
            "abe": "ABE – Lehigh Valley"
        }
    },
    "south-carolina": {
        "abbr": "SC",
        "cities": ["Columbia", "Charleston", "Greenville", "Myrtle Beach"],
        "airports": {
            "cae": "CAE – Columbia",
            "chs": "CHS – Charleston",
            "gsp": "GSP – Greenville",
            "myr": "MYR – Myrtle Beach"
        }
    },
    "south-dakota": {
        "abbr": "SD",
        "cities": ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings"],
        "airports": {
            "fsd": "FSD – Sioux Falls",
            "rap": "RAP – Rapid City",
            "pir": "PIR – Pierre",
            "abr": "ABR – Aberdeen"
        }
    },
    "tennessee": {
        "abbr": "TN",
        "cities": ["Nashville", "Memphis", "Knoxville", "Chattanooga"],
        "airports": {
            "bna": "BNA – Nashville",
            "mem": "MEM – Memphis",
            "tys": "TYS – Knoxville",
            "cha": "CHA – Chattanooga"
        }
    },
    "texas": {
        "abbr": "TX",
        "cities": ["Dallas", "Houston", "Austin", "San Antonio"],
        "airports": {
            "dfw": "DFW – Dallas/Fort Worth",
            "iah": "IAH – Houston",
            "aus": "AUS – Austin",
            "sat": "SAT – San Antonio"
        },
        "skip": True
    },
    "utah": {
        "abbr": "UT",
        "cities": ["Salt Lake City", "Provo", "Ogden", "St. George"],
        "airports": {
            "slc": "SLC – Salt Lake City",
            "pvu": "PVU – Provo",
            "ogd": "OGD – Ogden",
            "sgu": "SGU – St. George"
        }
    },
    "virginia": {
        "abbr": "VA",
        "cities": ["Virginia Beach", "Richmond", "Norfolk", "Alexandria"],
        "airports": {
            "iad": "IAD – Dulles",
            "dca": "DCA – Reagan",
            "orf": "ORF – Norfolk",
            "ric": "RIC – Richmond"
        }
    },
    "washington": {
        "abbr": "WA",
        "cities": ["Seattle", "Spokane", "Tacoma", "Olympia"],
        "airports": {
            "sea": "SEA – Seattle-Tacoma",
            "geg": "GEG – Spokane",
            "bli": "BLI – Bellingham",
            "psc": "PSC – Tri-Cities"
        }
    },
    "washington-dc": {
        "abbr": "DC",
        "cities": ["Washington"],
        "airports": {
            "dca": "DCA – Reagan National",
            "iad": "IAD – Dulles",
            "bwi": "BWI – Baltimore/Washington",
            "": ""
        }
    },
    "west-virginia": {
        "abbr": "WV",
        "cities": ["Charleston", "Morgantown", "Huntington", "Parkersburg"],
        "airports": {
            "crw": "CRW – Yeager",
            "ckb": "CKB – Clarksburg",
            "hts": "HTS – Huntington",
            "lwb": "LWB – Greenbrier Valley"
        }
    },
    "wisconsin": {
        "abbr": "WI",
        "cities": ["Milwaukee", "Madison", "Green Bay", "Kenosha"],
        "airports": {
            "mke": "MKE – Milwaukee",
            "msn": "MSN – Madison",
            "grb": "GRB – Green Bay",
            "atw": "ATW – Appleton"
        }
    },
    "new-jersey": {
        "abbr": "NJ",
        "cities": ["Newark", "Jersey City", "Trenton", "Atlantic City"],
        "airports": {
            "ewr": "EWR – Newark",
            "ttn": "TTN – Trenton",
            "acy": "ACY – Atlantic City",
            "": ""
        },
        "root_dir": "service-areas/new-jersey"
    },
    "rhode-island": {
        "abbr": "RI",
        "cities": ["Providence", "Warwick", "Newport", "Cranston"],
        "airports": {
            "pvd": "PVD – Providence",
            "npt": "NPT – Newport",
            "wst": "WST – Westerly",
            "bid": "BID – Block Island"
        },
        "root_dir": "service-areas/rhode-island"
    }
}

def make_links(items):
    return "\n    ".join(f'<a href="#">{label}</a>' for label in items)


def make_airport_links(ap):
    return "\n    ".join(f'<a href="/service-areas/airport/{code}">{name}</a>' for code, name in ap.items() if code)


def main():
    for key, info in states.items():
        if info.get("skip"):
            continue  # existing page
        dir_path = info.get("root_dir", f"service-areas/usa/{key}")
        Path(dir_path).mkdir(parents=True, exist_ok=True)
        city_links = make_links(info["cities"])
        airport_links = make_airport_links(info["airports"])
        example_city = info["cities"][0]
        html = TEMPLATE.substitute(state=info.get("title", key.replace('-', ' ').title()),
                                   city_links=city_links,
                                   airport_links=airport_links,
                                   example_city=example_city,
                                   abbr=info["abbr"])
        with open(Path(dir_path)/"index.html", "w") as f:
            f.write(html)


if __name__ == "__main__":
    main()
