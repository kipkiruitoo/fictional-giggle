import express from "express";
import { makeProviders, makeStandardFetcher, targets } from '@movie-web/providers';
import bodyParser from "body-parser";
import cors from "cors";



const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {


    res.send('Welcome to my server!');
});



app.get("/web", async (req, res, next) => {

    const m = req.query.m;;
    console.log(m);


    const media = {
        type: 'movie',
        tmdbId: m
    }

    const providers = makeProviders({
        fetcher: makeStandardFetcher(fetch),
        target: targets.BROWSER,
    })

    const output = await providers.runAll({
        media: media
    })

    // console.log(output);


    res.send({
        'status': 'Success',
        'result':
            output
    });

});

app.get("/mobile", async (req, res, next) => {

    const m = req.query.m;;
    console.log(m);


    const media = {
        type: 'movie',
        tmdbId: m
    }

    const providers = makeProviders({
        fetcher: makeStandardFetcher(fetch),
        target: targets.NATIVE,
    })

    const output = await providers.runAll({
        media: media
    })

    // console.log(output);


    res.send({
        'status': 'Success',
        'result':
            output
    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});