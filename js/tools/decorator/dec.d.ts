import BaseLogic from '../../base';
declare function testClass(target: Function): void;
declare function dec(id: string): (target: typeof BaseLogic, property: string, descriptor: TypedPropertyDescriptor<any>) => void;
declare function getProp(params: string): ClassDecorator;
export { testClass, dec, getProp };
//# sourceMappingURL=dec.d.ts.map