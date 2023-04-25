var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app.js");

//assertion style
chai.should();

chai.use(chaiHttp);

describe("POST /api/user/add", () => {
    it("It should POST a new user", (done)=>{
        const user = {
            username : "ning li"
        };
        chai.request(server)
            .post("/api/user/add")
            .send(user)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id');               
                response.body.should.have.property('username').eq("ning li");
                response.body.should.have.property('posts').to.be.an('array');
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});

describe("POST /api/user/add", () => {
    it("It should POST a new user", (done)=>{
        const user = {
            username : "jonathan li"
        };
        chai.request(server)
            .post("/api/user/add")
            .send(user)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('username').eq("jonathan li");
                response.body.should.have.property('posts').to.be.an('array');
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});

describe("POST /api/user/add", () => {
    it("It should POST a new user", (done)=>{
        const user = {
            username : "jeff li"
        };
        chai.request(server)
            .post("/api/user/add")
            .send(user)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('username').eq("jeff li");
                response.body.should.have.property('posts').to.be.an('array');
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});


describe("POST /api/user/add", () => {
    it("It should not POST a identical username", (done)=>{
        const user = {
            username : "Ning Li"
        };
        chai.request(server)
            .post("/api/user/add")
            .send(user)
            .end((err, response) => {
                response.should.have.status(400);
                response.body.should.be.a('object');
                response.body.should.have.property('message');
            done();
            });
    });
});


describe("GET /api/user", () => {
    it("It should GET all users", (done)=>{
        
        chai.request(server)
            .get("/api/user")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('array');
                response.body.length.should.be.eq(6);
            done();
            });
    });
});

describe("POST /api/post/add", () => {
    it("It should POST a new post", (done)=>{
        const post = {
            "content": "first post by Ning",
            "user": "6427a1277fd44a88726f052a"
        };
        chai.request(server)
            .post("/api/post/add")
            .send(post)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("first post by Ning");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052a");
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});


describe("POST /api/post/add", () => {
    it("It should POST a new post", (done)=>{
        const post = {
            "content": "second post by Ning",
            "user": "6427a1277fd44a88726f052a"
        };
        chai.request(server)
            .post("/api/post/add")
            .send(post)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("second post by Ning");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052a");
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});

describe("POST /api/post/add", () => {
    it("It should POST a new post", (done)=>{
        const post = {
            "content": "first post by Jonathan",
            "user": "6427a1277fd44a88726f052d"
        };
        chai.request(server)
            .post("/api/post/add")
            .send(post)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("first post by Jonathan");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052d");
                response.body.should.have.property('replies').to.be.an('array');
                response.body.should.have.property('likes').to.be.an('array');
            done();
            });
    });
});


describe("PUT /api/post/update/:id", () => {
    it("It should PUT a new update", (done)=>{
        const post = {
            "content": "modified first post",
        };

        const id = "64284abd11f7c3f38cc1b498";
        chai.request(server)
            .put("/api/post/update/" + id)
            .send(post)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('content').eq("modified first post");
            done();
            });
    });
});


describe("DELETE /api/post/:id", () => {
    it("It should DELETE a post", (done)=>{

        const id = "64284abd11f7c3f38cc1b498";
        chai.request(server)
            .delete("/api/post/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eq("Successfully deleted");
            done();
            });
    });
});

describe("GET /api/post/user/:id", () => {
    it("It should GET all posts of this user", (done)=>{
        const id = "6427a1277fd44a88726f052a";
        chai.request(server)
            .get("/api/post/user/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('posts').to.be.an('array').to.have.lengthOf(2);                
            done();
            });
    });
});


describe("POST /api/reply/add", () => {
    it("It should POST a new reply", (done)=>{
        const reply = {
            "content": "Jonathan first reply to Ning first post",
            "post": "642864cb5419c10e378dc02a",
            "user": "6427a1277fd44a88726f052d"
        };
        chai.request(server)
            .post("/api/reply/add")
            .send(reply)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("Jonathan first reply to Ning first post");
                response.body.should.have.property('post').eq("642864cb5419c10e378dc02a");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052d");
            done();
            });
    });
});


describe("POST /api/reply/add", () => {
    it("It should POST a new reply", (done)=>{
        const reply = {
            "content": "Jeff first reply to Ning first post",
            "post": "642864cb5419c10e378dc02a",
            "user": "6427a1277fd44a88726f0530"
        };
        chai.request(server)
            .post("/api/reply/add")
            .send(reply)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("Jeff first reply to Ning first post");
                response.body.should.have.property('post').eq("642864cb5419c10e378dc02a");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f0530");
            done();
            });
    });
});

describe("POST /api/reply/add", () => {
    it("It should POST a new reply", (done)=>{
        const reply = {
            "content": "Jonathan second reply to Ning first post",
            "post": "642864cb5419c10e378dc02a",
            "user": "6427a1277fd44a88726f052d"
        };
        chai.request(server)
            .post("/api/reply/add")
            .send(reply)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('content').eq("Jonathan second reply to Ning first post");
                response.body.should.have.property('post').eq("642864cb5419c10e378dc02a");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052d");
            done();
            });
    });
}); 

describe("PUT /api/reply/update/:id", () => {
    it("It should PUT a new update", (done)=>{
        const reply = {
            "content": "modified Jeff first reply",
        };

        const id = "642865b77c84b13b9796efdd";
        chai.request(server)
            .put("/api/reply/update/" + id)
            .send(reply)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('content').eq("modified Jeff first reply");
            done();
            });
    });
});


describe("DELETE /api/reply/:id", () => {
    it("It should DELETE a reply", (done)=>{

        const id = "642865b77c84b13b9796efdd";
        chai.request(server)
            .delete("/api/reply/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eq("Successfully deleted");
            done();
            });
    });
});

describe("GET /api/reply/user/:id", () => {
    it("It should GET all replies of this user", (done)=>{
        const id = "6427a1277fd44a88726f052d";
        chai.request(server)
            .get("/api/reply/user/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('replies').to.be.an('array').to.have.lengthOf(2);                
            done();
            });
    });
});


describe("GET /api/reply/post/:id", () => {
    it("It should GET all replies of this post", (done)=>{
        const id = "642864cb5419c10e378dc02a";
        chai.request(server)
            .get("/api/reply/post/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('replies').to.be.an('array').to.have.lengthOf(2);                
            done();
            });
    });
});

describe("GET /api/reply", () => {
    it("It should GET all replies", (done)=>{
        
        chai.request(server)
            .get("/api/reply")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('array');                
            done();
            });
    });
});


describe("POST /api/like/add", () => {
    it("It should POST a new like", (done)=>{
        const like = {
            "post": "642864cb5419c10e378dc02a",
            "user": "6427a1277fd44a88726f052d"
        };
        chai.request(server)
            .post("/api/like/add")
            .send(like)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('post').eq("642864cb5419c10e378dc02a");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f052d");
            done();
            });
    });
});


describe("POST /api/like/add", () => {
    it("It should POST a new like", (done)=>{
        const like = {
            "post": "642864cb5419c10e378dc02a",
            "user": "6427a1277fd44a88726f0530"
        };
        chai.request(server)
            .post("/api/like/add")
            .send(like)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('post').eq("642864cb5419c10e378dc02a");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f0530");
            done();
            });
    });
});


describe("POST /api/like/add", () => {
    it("It should POST a new like", (done)=>{
        const like = {
            "post": "642864cc5419c10e378dc02e",
            "user": "6427a1277fd44a88726f0530"
        };
        chai.request(server)
            .post("/api/like/add")
            .send(like)
            .end((err, response) => {
                response.should.have.status(201);
                response.body.should.be.a('object');
                response.body.should.have.property('_id'); 
                response.body.should.have.property('post').eq("642864cc5419c10e378dc02e");
                response.body.should.have.property('user').eq("6427a1277fd44a88726f0530");
            done();
            });
    });
});


describe("DELETE /api/like/:id", () => {
    it("It should DELETE a like", (done)=>{

        const id = "64286d63c7945c4e0c0d4371";
        chai.request(server)
            .delete("/api/like/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('message').eq("Successfully deleted");
            done();
            });
    });
});

describe("GET /api/like/user/:id", () => {
    it("It should GET all likes of this user", (done)=>{
        const id = "6427a1277fd44a88726f0530";
        chai.request(server)
            .get("/api/like/user/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('likes').to.be.an('array');                
            done();
            });
    });
});


describe("GET /api/like/post/:id", () => {
    it("It should GET all likes of this post", (done)=>{
        const id = "642864cb5419c10e378dc02a";
        chai.request(server)
            .get("/api/like/post/" + id)
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.have.property('likes').to.be.an('array');                
            done();
            });
    });
});

describe("GET /api/like", () => {
    it("It should GET all likes", (done)=>{
        
        chai.request(server)
            .get("/api/like")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.an('array');                
            done();
            });
    });
});


