module.exports = grammar({
  name: 'samalang',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.variable_declaration,
      $.function_definition,
      $.if_statement,
      $.while_statement,
      $.for_statement,
      $.print_statement,
      $.return_statement,
      $.break_statement,
      $._expression
    ),

    variable_declaration: $ => seq(
      'ada',
      $.identifier,
      '=',
      $._expression
    ),

    function_definition: $ => seq(
      'fungsi',
      $.identifier,
      $.parameters,
      repeat($._statement),
      'jure_mo'
    ),

    if_statement: $ => seq(
      'lamen',
      $._expression,
      'tres',
      repeat($._statement),
      optional(repeat($.elseif_clause)),
      optional($.else_clause),
      'jure_mo'
    ),

    elseif_clause: $ => seq(
      'lamen_no_kebali',
      $._expression,
      'tres',
      repeat($._statement)
    ),

    else_clause: $ => seq(
      'lamen_no',
      repeat($._statement)
    ),

    while_statement: $ => seq(
      choice('untu', 'selama'),
      $._expression,
      'boat',
      repeat($._statement),
      'jure_mo'
    ),

    for_statement: $ => seq(
      'untuk',
      $.identifier,
      '=',
      $._expression,
      ',',
      $._expression,
      'boat',
      repeat($._statement),
      'jure_mo'
    ),

    print_statement: $ => seq(
      'tulis',
      '(',
      $._expression,
      ')'
    ),

    return_statement: $ => prec.left(seq('semalik', optional($._expression))),

    break_statement: $ => 'jangka_mo',

    parameters: $ => seq(
      '(',
      optional(sepBy(',', $.identifier)),
      ')'
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.nil,
      $.binary_expression,
      $.unary_expression,
      seq('(', $._expression, ')')
    ),

    binary_expression: $ => choice(
      prec.left(2, seq($._expression, choice('+', '-', '*', '/'), $._expression)),
      prec.left(1, seq($._expression, choice('==', '!=', '<', '>'), $._expression))
    ),

    unary_expression: $ => prec(3, seq('no', $._expression)),

    identifier: $ => /[a-zA-Z_]\w*/,
    number: $ => /\d+/,
    string: $ => seq('"', /[^"]*/, '"'),
    boolean: $ => choice('true', 'false'),
    nil: $ => 'nda_isi',
    comment: $ => seq('#', /.*/)
  }
});

function sepBy(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}