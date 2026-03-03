/**
 * Post-Market Ads Injector (With Title, Price & Flaticon)
 */
(function() {
    // 1. Kasinthidwe ka Malonda (Added 'title' and 'price')
    const marketAds = [
        { title: "Free Apps Download", img: "images/free apps.jpg", type: "website", link: "https://wanderprograms.github.io/apps/", price: "Free" },
        { title: "Recoded Mic", img: "images/recoded mic1.jpg", type: "whatsapp", link: "265990914737", price: "MK 35,000" },
        { title: "Recoded Mic", img: "images/recoded mic3.jpg", type: "whatsapp", link: "265990914737", price: "MK 35,000" },
        { title: "Recoded Mic", img: "images/recoded mic2.jpg", type: "whatsapp", link: "265990914737", price: "MK 35,000" },
        { title: "LCD sumsang galaxy S24", img: "images/LCD sumsang galaxy S24.jpg", type: "whatsapp", link: "265990914737", price: "MK 75,000" },
        { title: "Lenovo Laptop", img: "images/lenovo1.jpg", type: "whatsapp", link: "265990914737", price: "MK 450,000" },
        { title: "HP Laptop", img: "images/HP pc1.jpg", type: "whatsapp", link: "265990914737", price: "MK 550,000" },
        { title: "Samsung Galaxy M33", img: "images/Samsung_Galaxy_M33_5G_price_in.jpg", type: "whatsapp", link: "265990914737", price: "MK 450,000" }
    ];

    marketAds.sort(() => Math.random() - 0.5);

    // 2. CSS Updated for Title and Professional Look
    const style = document.createElement('style');
    style.innerHTML = `
        .market-section { padding: 15px 0; background: #f9f9f9; border-bottom: 8px solid #f0f2f5; margin-top: 5px; position: relative; }
        .market-header { display: flex; justify-content: space-between; align-items: center; padding: 0 15px 10px; }
        .market-title-main { font-weight: bold; font-size: 13px; color: #65676b; text-transform: uppercase; letter-spacing: 0.5px; margin: 0; }
        
        .scroll-btn { 
            display: flex; align-items: center; justify-content: center;
            width: 30px; height: 30px; background: #0a2b4f; color: #fff; 
            border-radius: 50%; cursor: pointer; border: none; transition: 0.3s;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .scroll-btn i { font-size: 14px; margin-top: 3px; }

        .market-slider { 
            display: flex; overflow-x: auto; gap: 12px; padding: 0 15px; 
            scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }
        .market-slider::-webkit-scrollbar { display: none; }
        
        .market-item { 
            flex: 0 0 160px; background: white; border-radius: 12px; 
            overflow: hidden; border: 1px solid #eee; display: flex; 
            flex-direction: column; box-shadow: 0 2px 5px rgba(0,0,0,0.05);
            position: relative;
        }

        .price-badge {
            position: absolute; top: 10px; left: 10px;
            background: rgba(0, 0, 0, 0.7); color: white;
            padding: 4px 8px; border-radius: 6px;
            font-size: 10px; font-weight: bold; z-index: 5;
        }

        .market-item img { width: 160px; height: 160px; object-fit: cover; background: #f0f2f5; }

        /* Product Title Style */
        .ad-product-name {
            padding: 8px 10px 4px;
            font-size: 13px;
            font-weight: 700;
            color: #1c1e21;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis; /* Ngati dzina litali kwambiri lidula bwinobwino */
        }

        .market-btn { border: none; padding: 10px; font-weight: bold; font-size: 12px; cursor: pointer; text-align: center; text-decoration: none; color: white; display: block; margin-top: auto; }
        .btn-wa { background: #25D366; }
        .btn-web { background: #0a2b4f; }
    `;
    document.head.appendChild(style);

    let postCounter = 0;
    let adShown = false;

    const originalRenderPost = window.renderPost;

    window.renderPost = function(p) {
        if (typeof originalRenderPost === 'function') {
            originalRenderPost(p);
        }

        if (!adShown) {
            postCounter++;
            if (postCounter === 5) {
                const feed = document.getElementById("postsFeed");
                if (feed) {
                    injectMarketAds(feed);
                    adShown = true;
                }
            }
        }
    };

    function injectMarketAds(container) {
        const marketDiv = document.createElement("div");
        marketDiv.className = "market-section";
        
        let adsHtml = `
            <div class="market-header">
                <p class="market-title-main">Sponsored Market</p>
                <button class="scroll-btn" onclick="document.getElementById('m-slider').scrollBy(180, 0)">
                    <i class="fi fi-sr-angle-right"></i>
                </button>
            </div>
            <div class="market-slider" id="m-slider">`;

        marketAds.forEach(ad => {
            let buttonHtml = ad.type === "whatsapp" 
                ? `<a href="https://wa.me/${ad.link}" target="_blank" class="market-btn btn-wa">WhatsApp</a>`
                : `<a href="${ad.link}" target="_blank" class="market-btn btn-web">Visit Website</a>`;

            adsHtml += `
                <div class="market-item">
                    ${ad.price ? `<div class="price-badge">${ad.price}</div>` : ''}
                    <img src="${ad.img}" onerror="this.src='https://via.placeholder.com/160?text=No+Image'">
                    <div class="ad-product-name">${ad.title}</div>
                    ${buttonHtml}
                </div>`;
        });

        adsHtml += `</div>`;
        marketDiv.innerHTML = adsHtml;
        container.appendChild(marketDiv);
        
        if(typeof updateHeight === 'function') updateHeight();
    }
})();