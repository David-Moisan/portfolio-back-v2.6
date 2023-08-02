const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const projectsFilePath = path.join(__dirname, "projects.json");
const blogFilePath = path.join(__dirname, "blog.json");

const PORT = process.env.PORT || 3001;

const app = express();

let projectsData;
let blogData;

fs.readFile(projectsFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading project.json", err)
        return;
    }

    projectsData = JSON.parse(data);
    console.log("Projects data loaded successfully");
});

fs.readFile(blogFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading blog.json", err)
        return;
    }
    
    blogData = JSON.parse(data);
    console.log("Blog data loaded successfully");
});

app.use(cors());

app.get('/project', (req, res) => {
    res.json(projectsData)
})

app.get('/project/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const project = projectsData.find(item => item.id === id);

    if(!project) {
        return res.status(404).json({ error: "Projet non trouvé"});
    }

    res.json(project);
})

app.get('/blog', (req, res) => {
    res.json(blogData)
})

app.get('/blog/:slug', (req, res) => {
    const slug = req.params.slug;

    const article = blogData.find(item => item.slug === slug);

    if(!article) {
        return res.status(404).json({ error: "Article non trouvé" });
    }

    res.json(article);
})

app.get('/', (req, res) => {
    res.send('Hello, this is the root endpoint of the API service.');
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});