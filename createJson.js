//const fs = require('fs');
let nodes = [];
let links = [];

function createUserJSON(pk, name, username, imageURL, isPrivate) {
    const user = {
        id: pk,
        name: name,
        username: username,
        imageURL: imageURL ? imageURL.toString() : null,
        private: isPrivate
    };
    nodes.push(user);
}

function createUserLink(source, target) {
    const link = {
        source: source,
        target: target
    };
    links.push(link);
}

// Recursive function to write user data and links
function recursiveWriting(user) {
    createUserJSON(user.pk, user.name, user.username, user.imageURL, user.private);

    // Create links between current user and its followers
    if (user.follower) {
        user.follower.forEach(follower => {
            createUserLink(user.pk, follower.pk);
            recursiveWriting(follower); // Recursively call for each follower
        });
    }
}

// Example usage:
const user = {
    pk: "1",
    name: "John Doe",
    username: "john_doe",
    imageURL: new URL("https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png"),
    follower: [
        {
            pk: "2",
            name: "Alice",
            username: "alice123",
            imageURL: new URL("https://th.bing.com/th/id/OIP.0011pvrGeHPbbm3DVP1zRgHaHa?w=178&h=180&c=7&r=0&o=5&pid=1.7"),
            follower: [
                {
                    pk: "4",
                    name: "Alidsfce",
                    username: "alisdfsce123",
                    imageURL: new URL("https://example.com/alice.jpg"),
                    follower: null,
                    private: false
                },
                {
                    pk: "5",
                    name: "Bsdfob",
                    username: "bobsdf456",
                    imageURL: null,
                    follower: null,
                    private: true
                }
            ],
            private: false
        },
        {
            pk: "3",
            name: "Bob",
            username: "bob456",
            imageURL: null,
            follower: null,
            private: true
        }
    ],
    private: false
};

recursiveWriting(user);

export const data = { nodes: nodes, links: links };

/*// Convert data object to JSON string
const jsonData = JSON.stringify({ nodes: nodes, links: links }, null, 2);

// Write JSON data to a file
fs.writeFile('data.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error('Error writing JSON to file:', err);
        return;
    }
    console.log('JSON data has been written to data.json file');
});*/