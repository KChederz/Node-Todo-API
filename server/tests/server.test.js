const expect = require('expect');
const request = require('supertest');

const app = require('../server');
const Todo = require('../models/todo');
const User = require('../models/user');

beforeEach(done => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', done => {
        const text = 'My test todo text';
        
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(ex => done(ex));
            });
    });

    it('should not create todo with invalid body data', done => {
        const text = ''; // invalid data

        request(app)
            .post('/todos')
            .send({text})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(ex => done(ex));
            });
    });
});