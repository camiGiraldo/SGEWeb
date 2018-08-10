import { CategoriaEventosModule } from './categoria-eventos.module';

describe('BlankPageModule', () => {
    let blankPageModule: CategoriaEventosModule;

    beforeEach(() => {
        blankPageModule = new CategoriaEventosModule();
    });

    it('should create an instance', () => {
        expect(blankPageModule).toBeTruthy();
    });
});
