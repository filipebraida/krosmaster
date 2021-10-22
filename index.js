const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://krosarchive.es';

const urlList = url + '/PT/seasons';

axios(urlList).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);

    const krosmasters = [];

    const links = $('a[data-classes]');

    links.each(function() {
        const page = $(this).attr('href');

        const arrayPages = page.map

        axios(url + page).then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const name = $('#KrosName').text().trim()
            const level = $('#KrosLvl').text().trim()
            const figurine = $('#figurine img').attr('src')
            const init = $('#KrosInit').text().trim()
            const mp = $('#MP').text().trim()
            const hp = $('#HP').text().trim()
            const ap = $('#AP').text().trim()
        
            krosmasters.push({
                name, level, figurine, init, mp, hp, ap
            })
        })
    })

    console.log(krosmasters);
}).catch(console.error);
