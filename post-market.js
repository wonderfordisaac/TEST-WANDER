/**
 * Post-Market Ads Injector (Optimized for WanderSlapp with Titles)
 */
(function() {
    // 1. Kasinthidwe ka Malonda (Added 'title')
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

    // 2. Styles
    const style = document.createElement('style');
    style.innerHTML = `
        .market-section { padding: 15px 0; background: #f9f9f9; border-bottom: 8px solid #f0f2f5; margin-top: 5px; position: relative; width: 100%; overflow: hidden; }
        .market-header { display: flex; justify-content: space-between; align-items: center; padding: 0 15px 10px; }
        .market-title { font-weight: bold; font-size: 13px; color: #65676b; text-transform: uppercase; margin: 0; }
        .scroll-btn { display: flex; align-items: center; justify-content: center; width: 30px; height: 30px; background: #0a2b4f; color: #fff; border-radius: 50%; border: none; cursor: pointer; }
        
        .market-slider { display: flex; overflow-x: auto; gap: 12px; padding: 0 15px; scrollbar-width: none; -ms-overflow-style: none; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; }
        .market-slider::-webkit-scrollbar { display: none; }
        
        .market-item { flex: 0 0 160px; background: white; border-radius: 12px; overflow: hidden; border: 1px solid #eee; display: flex; flex-direction: column; position: relative; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .price-badge { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: bold; z-index: 2; }
        .market-item img { width: 160px; height: 160px; object-fit: cover; background: #eee; }
        
        /* Product Title Style */
        .ad-item-name { 
            padding: 8px 10px 4px; 
            font-size: 13px; 
            font-weight: bold; 
            color: #1c1e21; 
            white-space: nowrap; 
            overflow: hidden; 
            text-overflow: ellipsis; 
        }

        .market-btn { border: none; padding: 10px; font-weight: bold; font-size: 12px; text-align: center; text-decoration: none; color: white; display: block; margin-top: auto; }
        .btn-wa { background: #25D366; }
        .btn-web { background: #0a2b4f; }
    `;
    document.head.appendChild(style);

    let adShown = false;

    // 3. Logic: MutationObserver for dynamic feed insertion
    const observer = new MutationObserver(() => {
        const feed = document.getElementById("postsFeed");
        if (!feed || adShown) return;

        const posts = feed.getElementsByClassName("post-card");
        
        if (posts.length >= 5) {
            injectMarketAds(posts[4]); // Insert after the 5th post
            adShown = true;
            observer.disconnect(); 
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function injectMarketAds(targetPost) {
        const marketDiv = document.createElement("div");
        marketDiv.className = "market-section";
        
        let adsHtml = `
            <div class="market-header">
                <p class="market-title">Sponsored Market</p>
                <button class="scroll-btn" onclick="this.parentElement.nextElementSibling.scrollBy(180, 0)">
                    <i class="fi fi-sr-angle-right"></i>
                </button>
            </div>
            <div class="market-slider">`;

        marketAds.forEach(ad => {
            const btn = ad.type === "whatsapp" 
                ? `<a href="https://wa.me/${ad.link}" target="_blank" class="market-btn btn-wa">WhatsApp</a>`
                : `<a href="${ad.link}" target="_blank" class="market-btn btn-web">Visit Website</a>`;

            adsHtml += `
                <div class="market-item">
                    <div class="price-badge">${ad.price}</div>
                    <img src="${ad.img}" onerror="this.src='https://via.placeholder.com/160?text=No+Image'">
                    <div class="ad-item-name">${ad.title}</div>
                    ${btn}
                </div>`;
        });

        adsHtml += `</div>`;
        marketDiv.innerHTML = adsHtml;
        
        // Insert after the target post
        targetPost.parentNode.insertBefore(marketDiv, targetPost.nextSibling);
        
        // Update Height for parent iframe
        if (typeof window.parent.postMessage === 'function') {
            window.parent.postMessage({ type: "SET_HEIGHT", height: document.body.scrollHeight }, "*");
        }
    }
})();