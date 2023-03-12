import { Compiler, Configuration, Stats } from "webpack";

declare function browserpack(options: Configuration, callback?: (err?: Error, stats?: Stats) => void): Compiler
