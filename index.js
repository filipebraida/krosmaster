const axios = require('axios');
const cheerio = require('cheerio');
const database = require('./db');
const Krosmaster = require('./krosmaster');

const host = 'https://krosarchive.es';

const urlList = host + '/PT/seasons';

const getKrosmasterList = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const nodes = $('a[data-classes]');

        const krosmasters = [];

        for(const node of nodes) {
            const krosmasterLink = $(node).attr('href');
            console.log('catching - ' + krosmasterLink)
            const data = await getKrosmaster(host + krosmasterLink)
            console.log('adding...')

            await addKrosmaster(data)
            krosmasters.push(data)
        }

        return krosmasters;
    } catch(error) {
        console.error(error)
    }

    return [];
}

const addKrosmaster = async (data) => {
    try {
        const resultado = await database.sync();
        
        const resultadoCreate = await Krosmaster.create({
            name: data.name,
            level: data.level,
            figurine: data.figurine,
            init: data.init,
            mp: data.mp,
            hp: data.hp,
            ap: data.ap
        })
    } catch (error) {
        throw error;
    }
}

const getKrosmaster = async (url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const name = $('#KrosName').text().trim()
        const level = $('#KrosLvl').text().trim()
        const figurine = $('#figurine img').attr('src')
        const init = $('#KrosInit').text().trim()
        const mp = $('#MP').text().trim()
        const hp = $('#HP').text().trim()
        const ap = $('#AP').text().trim()
    
        return {
            name, level, figurine, init, mp, hp, ap
        }
    } catch(error) {
        throw error;
    }
}

async function main() {
    const data = await getKrosmasterList(urlList);
    console.log(data);
}

main()

