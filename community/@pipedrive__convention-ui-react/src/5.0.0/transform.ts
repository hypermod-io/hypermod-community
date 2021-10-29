import { API, FileInfo, Options } from "jscodeshift";

export default function transformer(file: FileInfo, { jscodeshift: j }: API, options: Options) {
    const source = j(file.source);

    return source.toSource(options.printOptions);
}
