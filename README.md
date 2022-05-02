# allow-rule

## Install

`npm i allow-rule`

## Usage

### Step 1. - Rules

A rule is defined by a function that takes a runtime context and a compile-time options object and returns 'allow' or 'deny'.

The built-in rules can be used anywhere after `useBuiltinRules()`, check `src/rules.ts` for the currently available rules.

Custom rules can be created with `addRule(id: RuleId, rule: RuleDefinition<unknown>)`, after which they are added to the rule store.

Methods `getRule(RuleId): RuleDefinition<unknown>`, `deleteRule(rule: RuleId)` and `deleteAllRules()` can be used to access and remove rules.

### Step 2. Rulesets

A Ruleset represents a set of rules that define access to a resource.

Rulesets are defined with a JSON-compatible syntax for runtime update possibility.

A ruleset can be
- a rule
- anyOf: {ruleset}
- allOf: {ruleset}
- noneOf: {ruleset}

Available manipulation functions are:
- `addRuleset(id: RulesetId, ruleset: Ruleset)`
- `getRuleset(id: RulesetId): Ruleset`
- `deleteRuleset(id: RulesetId)`
- `deleteAllRulesets()`
- `replaceRulesetStore(withStore: RulesetStore)`

### Step 3. Apply a ruleset

Use `applyRuleset(id: RulesetId, context: RuleContext): Promise<Result>` to apply a ruleset in a context. Please note that some rules may not be checked in some cases.

## License

This project is licensed under BSD-3-Clause.

Check `LICENSE` for details.

## Contributing

Feel free to create Issues or open Pull Requests if you have found any bugs or have any suggestions.

Please commit names starting with

|Emoji|Prefix|Description|
|-----|------|-----------|
|:zap:                   |`:zap:`                   |for implementing or extending functionality|
|:zap::zap:              |`:zap::zap:`              |for implementing or extending functionality|
|:hammer:                |`:hammer:`                |for bug fixes and non-breaking improvements|
|:wrench:                |`:wrench:`                |for configurations                         |
|:vertical_traffic_light:|`:vertical_traffic_light:`|for tests                                  |
|:memo:                  |`:memo:`                  |for documentations                         |
|:mag:                   |`:mag:`                   |for lint fixes                             |
|:recycle:               |`:recycle:`               |for non-breaking refactoring               |
|:paperclip:             |`:paperclip:`             |for dependencies                           |
|:octocat:               |`:octocat:`               |for workflows                              |
|:construction:          |`:construction:`          |for experimental or temporary changes      |