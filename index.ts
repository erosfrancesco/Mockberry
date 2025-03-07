const AdProviderMixin = (superclass) => class extends superclass {
    constructor(ws) {
        super();
        this.ws = ws;
    }
    bar() {
        console.log('bar');
    }
}

const SocialNetworkMixin = (superclass) => class extends superclass {
    foo() {
        console.log('foo');
    }
}

class MixinBuilder {
    static mix(...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), class { });
    }
}

// this will combine everything in one class
const mix = new MixinBuilder();

class Facebook extends MixinBuilder.mix(AdProviderMixin, SocialNetworkMixin) { 
    constructor() {
        super();
        console.log('hello w orld')
    }
}

const fb = new Facebook();