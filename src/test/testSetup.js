
// import chai from 'chai'
// import chaiEnzyme from 'chai-enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

process.env.BABEL_ENV = 'test';
process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';


Enzyme.configure({ adapter: new Adapter() });

//chai.use(chaiEnzyme()); // Note the invocation at the end
