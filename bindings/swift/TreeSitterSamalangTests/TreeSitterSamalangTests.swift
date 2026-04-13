import XCTest
import SwiftTreeSitter
import TreeSitterSamalang

final class TreeSitterSamalangTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_samalang())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Samalang grammar")
    }
}
