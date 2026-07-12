module.exports = grammar({
  name: 'samawa_language',

  extras: $ => [
    /\s/,
    $.comment,
  ],

  conflicts: $ => [
    [$.binary_expression, $.binary_expression],
  ],

  rules: {
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.variable_declaration,
      $.function_definition,
      $.if_statement,
      $.while_statement,
      $.repeat_statement,
      $.for_statement,
      $.goto_statement,
      $.label_statement,
      $.require_statement,
      $.print_statement,
      $.return_statement,
      $.break_statement,
      $.assignment_statement,
      $.expression_statement,
    ),

    variable_declaration: $ => seq(
      'ada',
      $.identifier,
      '=',
      $._expression,
    ),

    assignment_statement: $ => seq(
      $.identifier,
      '=',
      $._expression,
    ),

    function_definition: $ => seq(
      'fungsi',
      field('name', $.identifier),
      field('parameters', $.parameters),
      repeat($._statement),
      'jure_mo',
    ),

    if_statement: $ => seq(
      'lamen',
      field('condition', $._expression),
      'tres',
      repeat($._statement),
      repeat($.elseif_clause),
      optional($.else_clause),
      'jure_mo',
    ),

    elseif_clause: $ => seq(
      'lamen_no_kebali',
      field('condition', $._expression),
      'tres',
      repeat($._statement),
    ),

    else_clause: $ => seq(
      'lamen_no',
      repeat($._statement),
    ),

    while_statement: $ => seq(
      choice('untu', 'selama'),
      field('condition', $._expression),
      'boat',
      repeat($._statement),
      'jure_mo',
    ),

    repeat_statement: $ => seq(
      'ulang',
      repeat($._statement),
      'sampe',
      field('condition', $._expression),
    ),

    for_statement: $ => seq(
      'untuk',
      field('variable', $.identifier),
      '=',
      field('start', $._expression),
      ',',
      field('end', $._expression),
      optional(seq(',', field('step', $._expression))),
      'boat',
      repeat($._statement),
      'jure_mo',
    ),

    goto_statement: $ => seq(
      'lalo',
      field('label', $.identifier),
    ),

    label_statement: $ => seq(
      '::',
      field('label', $.identifier),
      '::',
    ),

    require_statement: $ => seq(
      'ada',
      $.identifier,
      '=',
      'kenang',
      '(',
      field('module', $.string),
      ')',
    ),

    print_statement: $ => seq(
      'tulis',
      '(',
      field('argument', $._expression),
      ')',
    ),

    return_statement: $ => prec.left(seq(
      'semalik',
      optional(field('value', $._expression)),
    )),

    break_statement: $ => 'jangka_mo',

    expression_statement: $ => $._expression,

    parameters: $ => seq(
      '(',
      optional(commaSep($.identifier)),
      ')',
    ),

    arguments: $ => seq(
      '(',
      optional(commaSep($._expression)),
      ')',
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.boolean,
      $.nil,
      $.binary_expression,
      $.unary_expression,
      $.logical_expression,
      $.function_call,
      $.table_constructor,
      seq('(', $._expression, ')'),
    ),

    function_call: $ => prec(1, seq(
      field('function', $.identifier),
      field('arguments', $.arguments),
    )),

    table_constructor: $ => seq(
      '{',
      optional(commaSep(choice(
        $.table_field,
        $._expression,
      ))),
      '}',
    ),

    table_field: $ => choice(
      seq($.identifier, '=', $._expression),
      seq('[', $._expression, ']', '=', $._expression),
    ),

    binary_expression: $ => choice(
      prec.left(6, seq($._expression, '^', $._expression)),
      prec.left(5, seq($._expression, choice('*', '/', '%'), $._expression)),
      prec.left(4, seq($._expression, choice('+', '-'), $._expression)),
      prec.left(3, seq($._expression, '..', $._expression)),
      prec.left(2, seq($._expression, choice('==', '~=', '<', '>', '<=', '>='), $._expression)),
    ),

    unary_expression: $ => prec(7, seq('-', $._expression)),

    logical_expression: $ => choice(
      prec.left(1, seq($._expression, 'dan', $._expression)),
      prec.left(0, seq($._expression, 'atau', $._expression)),
      prec(8, seq('no', $._expression)),
    ),

    identifier: $ => /[a-zA-Z_]\w*/,

    number: $ => /\d+(\.\d+)?/,

    string: $ => choice(
      seq('"', /[^"]*/, '"'),
      seq("'", /[^']*/, "'"),
    ),

    boolean: $ => choice('tutu', 'siong'),

    nil: $ => 'nda_isi',

    comment: $ => seq('#', /.*/),
  },
});

function commaSep(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
